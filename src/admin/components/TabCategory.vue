<template>
	<div>
		<el-tree ref="tree" node-key="id"
		         :props="{ isLeaf: 'isLeaf' }" lazy
		         :load="loadData"
		         :expand-on-click-node="false">
			<span class="my-tree-node" slot-scope="{ node, data }"><!-- 自定义节点用插槽作用域-->
				<span v-text="data.name"></span>
				<span>
					<el-button type="text" size="medium" icon="el-icon-plus" @click="beginEdit(node, true)" v-if="node.level < 3"></el-button>
					<template v-if="node.level > 1">
						<el-button type="text" size="medium" icon="el-icon-edit-outline" @click="beginEdit(node, false)"></el-button>
						<el-button type="text" size="medium" icon="el-icon-delete" @click="removeCategory2(data)"></el-button>
						<el-popover :title="data.name" placement="right" trigger="hover" width="200">
							<el-image :src="data.avatar" fit="contain"></el-image>
							<el-button type="text" size="medium" icon="el-icon-picture-outline" slot="reference"></el-button>
						</el-popover>
					</template>
				</span>
			</span>
		</el-tree>
		<el-dialog :visible="edit.isEdit" :show-close="false" width="650px">
			<h3 slot="title">商品分类管理-{{ edit.isAdd ? '新增' : '修改' }}</h3>
			<div slot="footer">
				<el-button @click="edit.isEdit = false">取消</el-button>
				<el-button type="primary" @click="submitEdit">确定</el-button>
			</div>
			<el-form ref="form" label-width="80px" :model="edit.model" :rules="edit.rules" status-icon>
				<el-form-item label="父级分类">
					<el-select v-model="edit.model.fid" :disabled="edit.isAdd || edit.model.fid === 0">
						<el-option label="ROOT" :value="0" disabled></el-option>
						<el-option v-for="item in mainList" :key="item.id"
						:label="item.name"
						:value="item.id"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="分类名称" prop="name">
					<el-input v-model="edit.model.name" placeholder="请输入分类名称"></el-input>
				</el-form-item>
				<el-form-item label="分类图片">
					<div class="avatar-wrapper">
						<div class="old-avatar-wrapper" v-show="!edit.isAdd">
							<el-image class="old-avatar" :src="edit.model.oldAvatar"></el-image>
							<p>原图片</p>
						</div>
						<el-upload class="avatar-uploader"
						           action="/category/upload"
						           name="avatar"
						           accept=".jpg,.png"
						           :on-success="uploadSuccess"
						           list-type="picture-card"
						           :file-list="edit.fileList"
						           :on-remove="removeFile">
							<i class="el-icon-plus avatar-uploader-icon"></i>
							<div slot="tip">只能上传jpg/png文件，且大小不超过500KB</div>
						</el-upload>
					</div>
				</el-form-item>
			</el-form>
		</el-dialog>
	</div>
</template>

<script type="text/ecmascript-6">
	import { Loading } from 'element-ui';
	import { createNamespacedHelpers } from 'vuex';

	let { mapState, mapActions } = createNamespacedHelpers('category');

        export default {
                data() {
                        return {
                                edit: {
                                        isEdit: false,
	                                isAdd: true,
	                                fileList: [],
	                                model: { id: 0, fid: -1, name: '', avatar: '', oldAvatar: '' },
	                                rules: {        //制定表单元素验证规则
                                                name: [
	                                                { required: true, message: '商品分类名称不能为空', trigger: 'blur' },
	                                                { min: 2, max: 6, message: '商品分类名称长度必须在2-6之间', trigger: 'blur' }
                                                ]
	                                }
                                }
                        };
                },
                computed: {
	                ...mapState([ 'mainList', 'subLists' ])
                },
	        methods: {
		        ...mapActions([ 'initMainList', 'initSubLists', 'removeCategory', 'addCategory', 'updateCategory' ]),
		        loadData(node, resolve) {
		                switch(node.level) {
			                case 0:         //要根节点
			                        return resolve([{ id: 0, name: 'Root' }]);
			                        break;
			                case 1:         //要一级分类数据
				                resolve(this.mainList);
				                break;
			                case 2:         //要某一个一级分类的二级分类
				                console.log(node);
						this.initSubLists(node.data.id).then(() => {
						        let temp = this.subLists[node.data.id];
						        temp.forEach(item => item.isLeaf = true);
                                                        resolve(temp);
						});
			                        break;
			                default:
			                        resolve([]);
			                        break;
		                }
		        },
		        removeCategory2(data) {
                                this.$confirm(`确定删除 '${ data.name }' 分类?`, '提示', {
                                        //confirmButtonText: '确定',                //默认设置，可以不写
                                        //cancelButtonText: '取消',                   //同上
                                        type: 'warning'
                                }).then(() => {
                                        //通知仓库删除指定分类数据
	                                this.removeCategory(data)
		                                .then(() => this.$refs.tree.remove(data));
                                }).catch(() => {
                                        this.$message({
                                                type: 'info',
                                                message: '已取消删除'
                                        });
                                });
		        },
		        beginEdit(node, isAdd) {
		                this.edit.fileList = [];
                                if(this.$refs.form) this.$refs.form.clearValidate();
		                this.edit.isAdd = isAdd;
		                if(isAdd) {             //新增
		                        this.edit.model.fid = node.data.id;
		                        this.edit.model.name = '';
		                        this.edit.model.oldAvatar = '';
		                        this.edit.model.avatar = '';
		                } else {                //修改
		                        this.edit.model.id = node.data.id;
		                        this.edit.model.fid = node.parent.data.id;              //node.parent.data.id = node.data.fid
		                        this.edit.model.name = node.data.name;
                                        this.edit.model.oldAvatar = node.data.avatar;
                                        this.edit.model.avatar = node.data.avatar;
		                }
		                this.edit.isEdit = true;
		        },
		        uploadSuccess(response, file, fileList) {
				console.log(response);
				if(response.status === 200) this.edit.model.avatar = response.data;
				this.edit.fileList = fileList.slice(-1);
		        },
		        removeFile(file, fileList) {
		                this.edit.fileList = [];
		                if(this.edit.isAdd) this.edit.model.avatar = '';
		                else this.edit.model.avatar = this.edit.model.oldAvatar;
		        },
		        submitEdit() {
				this.$refs.form.validate()
					.then(() => {
				                if(this.edit.isAdd && this.edit.model.avatar === '') {
				                        this.$alert('必须为分类选择一张图片..', '提示', { type: 'warning' });
				                        return;
				                }
				                if(this.edit.isAdd) {   //新增
				                        this.addCategory(this.edit.model)
					                        //向树中插入一个节点
					                        .then(data => {
					                                if(data.fid !== 0) data.isLeaf = true;
					                                let parentNode = this.$refs.tree.getNode(data.fid);
                                                                        this.$refs.tree.append(data, parentNode);
                                                                        this.edit.isEdit = false;
					                        });
				                } else {        //修改
							this.updateCategory(this.edit.model)
								.then(() => {
							                let { id, fid, name, avatar, oldAvatar } = this.edit.model;
							                let obj = { id, fid, name, avatar: oldAvatar === avatar ? avatar : `/images/category/${ avatar }` };
							                let node = this.$refs.tree.getNode(this.edit.model.id);
							                if(fid === 0) node.data = obj;          //如果修改的是一级
									else {                                                  //如果修改的是二级
									        obj.isLeaf = true;
									        if(node.parent.data.id === this.edit.model.fid) node.data = obj;
									        else {
									                this.$refs.tree.remove(node.data);
									                if(typeof this.subLists[this.edit.model.fid] !== 'undefined') {
									                        let parentNode = this.$refs.tree.getNode(this.edit.model.fid);
									                        this.$refs.tree.append(obj, parentNode);
									                }
									        }
							                }
							                this.edit.isEdit = false;                       //关闭dialog
								});
				                }
					})
					.catch(() => {});
		        }
	        },
	        created() {
                        this.loading = Loading.service();
                        this.initMainList().then(() => this.loading.close());//通知仓库初始化一级分类数据
	        }
        };
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped>
	.el-tree
		width: 400px
		.my-tree-node
			flex: 1
			display: flex
			justify-content: space-between
			align-items: center
	.avatar-uploader
		display inline-block
		position: relative
		overflow: hidden
		.avatar-uploader-icon
			font-size: 28px
			color: #8c939d
			width: 150px
			height 150px
			line-height 150px
			text-align center
			/*border: 1px dashed #d9d9d9*/
			border-radius: 6px
			cursor: pointer
			&:hover
				border-color #409eff
	.avatar-wrapper
		display flex
		.old-avatar-wrapper
			.old-avatar
				width: 148px
				height: 148px
				border: 1px solid #d9d9d9
				border-radius: 6px
				margin-right 10px
			p
				color: #409eff
</style>