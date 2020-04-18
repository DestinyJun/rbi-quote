<template>
	<div id="codeDetail" class="codeDetail">
		<nav-bar class="nav-bar">
			<div slot="center">报告详细</div>
		</nav-bar>
		<CellGroup style="text-align: left;">
			<Cell :title="item.label" :extra="item.value" v-for="(item, index) in listData" :key="index"/>
		</CellGroup>
	</div>
</template>

<script src="./QRcodeDetail.component.js">
</script>

<style scoped lang="scss">
	@import "QRcodeDetail.component.scss";
</style>
