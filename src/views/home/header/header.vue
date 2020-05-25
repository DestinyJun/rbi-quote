<template>
	<div id="headers" class="header">
		<div class="logo">
			<img src="@/assets/images/ic_logo.png" alt="">
		</div>
		<div class="title">
			<span>您好{{name}},欢迎进入报告验证识别系统！</span>
			<img src="@/assets/images/ic_header.jpg" alt="" @click="showPreCard">
			<div :class="{'per-card': true, 'move': !preHiden}" :hidden="preHiden">
				<div style="display: flex;flex-direction: column;color: #000 ">
					<div v-if="!ischange">
						<div style="flex: 2;border-bottom: 1px solid #EEEEEE;text-align: left;line-height: 4vh">
							<p style="margin: 1vh 1vw;font-size: 14px">账户信息</p>
						</div>
						<div style="flex: 6;text-align: left;margin:1vh 1vw;">
							<div style="margin: 5px 0;">用户名： {{name}}</div>
							<!--            <div style="margin: 5px 0;">用户角色： </div>-->
							<div style="margin: 5px 0; display: flex;justify-content: center"><span
								style="flex: 1;color: #000">用户角色：</span>
								<div style="flex: 3;margin-top: -8px">
									<span
										style="display: inline-block; border: 1px solid #D8D8D8;padding: 2px 10px;margin: 6px 10px;font-size: 12px;color: #000;"
										v-for="(item, index) in roleLists" :key="index">{{item}}</span>
								</div>
							</div>
							<div style="text-align: right">
								<button
									style="background: #3DA2F8;border: 0;border-radius: 1px;color: #eee;font-size: 12px;padding: 4px 14px"
									@click="changePassword">修改密码
								</button>
								<button
									style="border: 0;box-shadow: 0 0 2px #000;border-radius: 1px;color: #000;background: #fff;font-size: 12px;padding: 4px 14px;margin-left: 1vw"
									@click="loginOut">退出
								</button>
							</div>
						</div>
					</div>
					<div v-if="ischange">
						<div style="flex: 1;border-bottom: 1px solid #EEEEEE;text-align: left">
							<p style="margin: 1vh 1vw;font-size: 14px">修改密码</p>
						</div>
						<div style="flex: 3;text-align: left;margin:1vh 1vw;">
							<div style="display: flex;align-items: center">
								<label for="" style="flex: 1">原密码：</label>
								<Input v-model="oldPass" type="password" placeholder="请输入原密码" style="flex: 4"/>
							</div>
							<div style="display: flex;align-items: center;margin: 1vh 0">
								<label for="" style="flex: 1">新密码：</label>
								<Input v-model="newPass"  type="password" placeholder="请输入新密码" style="flex: 4"/>
							</div>
							<div style="text-align: right">
								<button
									style="background: #3DA2F8;border: 0;border-radius: 1px;color: #eee;font-size: 12px;padding: 4px 14px"
									@click="sureChange">确定修改
								</button>
								<button
									style="border: 0;box-shadow: 0 0 2px #000;border-radius: 1px;color: #000;background: #fff;font-size: 12px;padding: 4px 14px;margin-left: 1vw"
									@click="ischange = false">取消
								</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import ToolUtil from "../../../utils/tool";
	import service from "../../../service/service";

	export default {
		name: 'headers',
		data() {
			return {
				name: 'xxxx',
				preHiden: true,
				ischange: false,
				newPass: '',
				oldPass: '',
				roleLists: [],
				tool: new ToolUtil(),
				headerSrv: new service
			}
		},
		created() {
			this.getUserInfoData();
		},
		methods: {
			getUserInfoData() {
				this.headerSrv.getUserInfo().then(val => {
					if (val.code === '1000') {
						this.name = val.data.name;
						this.roleLists = val.data.role;
					} else {
						this.tool.toast('error', val.msg)
					}
				})
			},
			showPreCard() {
				this.preHiden = !this.preHiden;
			},
			loginOut() {
				this.tool.setModal('confirm', '退出提醒', '确定要退出登录吗?', () => {
					this.headerSrv.logout().then(val => {
						if (val.code === '1000'){
							this.$router.push('/login')

						}else {
							this.tool.toast('error', val.msg)
						}
					})
				})
			},
			changePassword() {
				this.ischange = true;
			},
			sureChange() {
				if(this.newPass !== '' || this.oldPass !== '') {
					this.headerSrv.getUserPassword({oldPassword: this.oldPass, newPassword: this.newPass}).then(val => {
						if (val.code === '1000'){
							this.tool.toast('success', val.msg);
							this.$router.push('/login');
							this.newPass = '';
							this.oldPass = '';
							this.ischange = false;
						}else {
							this.tool.toast('error', val.msg)
						}
					})

				}else {
					this.tool.toast('error', '请输入需要改的密码')
				}

			}
		}
	}
</script>

<style lang="scss" scoped>
	.header {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		z-index: 998;
		background: #181F29;
		background: -moz-linear-gradient(-206deg, #181F29 5%, #181F29 100%);
		background: -webkit-linear-gradient(-206deg, #181F29 5%, #212531 100%);
		background: linear-gradient(-206deg, #181F29 5%, #181F29 100%);
		filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#24B4F5", endColorstr="#24B4F5", GradientType=1);
		-webkit-box-sizing: border-box;
		-moz-box-sizing: border-box;
		box-sizing: border-box;
		cursor: pointer;
		color: #fff;
		height: 6vh;
		background: #303437;
		box-shadow: 1px 1px 1px #2E3235;
		/*line-height: 6vh;*/

		.logo {
			float: left;

			img {
				height: 5.8vh;
				width: 12vw;
				box-shadow: 2px 3px 5px #2E3235;
			}
		}

		.title {
			position: relative;
			color: #fff;
			float: right;
			margin-top: 8.5px;

			span {
				margin-right: 0.5vw;
				color: #D6D7D6;
			}

			img {
				border-radius: 50%;
				width: 35px;
				margin-right: 2vw;
				margin-bottom: -12px;
				box-sizing: content-box;
				border: 2px solid #A5AAAB;
			}

			.per-card {
				position: absolute;
				margin-top: 1.2vh;
				background: #FFFFFF;
				width: 18vw;
				border-radius: 4px;
				/*top: 1px;*/
				right: 1vw;
				box-shadow: 0 0 5px #4D4D4D;
				color: #818181;
				z-index: 9999;

				li {
					padding: 10px;
					list-style: none;
					border-radius: 4px;
				}

				li:hover {
					background: #E9F3FF;
				}
			}

			.move {
				-moz-animation: myfirst 1s; /* Firefox */
				-webkit-animation: myfirst 1s; /* Safari and Chrome */
				-o-animation: myfirst 1s;
			}

			@keyframes myfirst {
				from {
					margin-top: 0;
				}
				to {
					margin-top: 1.3vh;
				}
			}
		}
	}
</style>
