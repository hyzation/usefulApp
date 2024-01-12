<template>
  <div>
		<!-- <view slot="gHeader">
			<view class="gui-flex gui-nowrap gui-rows gui-align-items-center messagebbox" style="padding-top: 22px;">
				<view @tap="backFun" class="gui-header-leader-btns" hover-class="gui-tap">
					<text class="gui-icons" style="font-size: 26px;">&#xe600;</text>
				</view>
				<view class="gui-flex1 gui-text-center">
					<text class="f36 gui-ellipsis">信息</text>
				</view>
			</view>
		</view> -->
  <div class="footbtn">
    <span @click="backFun">首页</span>
    <span @click="haoyouFun">好友</span>
    <span class="actspan">聊天</span>
  </div>
    <div
      class="tui-conversation"
      @click="handleClickConv"
      @touchstart="handleTouchStart"
      @touchend="handleTouchEnd"
    >
      <ConversationHeader v-if="isShowConversationHeader" ref="headerRef" />
      <ConversationNetwork />
      <ConversationList
        class="tui-conversation-list"
        ref="conversationListDomRef"
        @handleSwitchConversation="handleSwitchConversation"
        @getPassingRef="getPassingRef"
      />
    </div>
  </div>
  
</template>
<script lang="ts" setup>
import { TUIStore, StoreName } from "@tencentcloud/chat-uikit-engine";
import { ref } from "../../adapter-vue";
import { TUIGlobal } from "../../utils/universal-api/index";
import ConversationList from "./conversation-list/index.vue";
import ConversationHeader from "./conversation-header/index.vue";
import ConversationNetwork from "./conversation-network/index.vue";
import { onHide } from "@dcloudio/uni-app"; // 该方法只能用在父组件内，子组件内不生效

const emits = defineEmits(["handleSwitchConversation"]);

const totalUnreadCount = ref(0);
const headerRef = ref<HTMLElement | undefined>();
const conversationListDomRef = ref<HTMLElement | undefined>();
const touchX = ref<number>(0);
const touchY = ref<number>(0);
const isShowConversationHeader = ref<boolean>(true);

TUIStore.watch(StoreName.CONV, {
  totalUnreadCount: (count: number) => {
    totalUnreadCount.value = count;
  },
});

TUIStore.watch(StoreName.CUSTOM, {
  isShowConversationHeader: (showStatus: boolean) => {
    isShowConversationHeader.value = showStatus !== false;
  },
});

const handleSwitchConversation = (conversationID: string) => {
  TUIGlobal?.navigateTo({
    url: "/TUIKit/components/TUIChat/index",
  });
  emits("handleSwitchConversation", conversationID);
};

const closeChildren = () => {
  headerRef?.value?.closeChildren();
  conversationListDomRef?.value?.closeChildren();
};

const handleClickConv = () => {
  closeChildren();
};

onHide(closeChildren);

const handleTouchStart = (e: any) => {
  touchX.value = e.changedTouches[0].clientX;
  touchY.value = e.changedTouches[0].clientY;
};

const handleTouchEnd = (e: any) => {
  let x = e.changedTouches[0].clientX;
  let y = e.changedTouches[0].clientY;
  let turn = "";
  if (x - touchX.value > 50 && Math.abs(y - touchY.value) < 50) {
    //右滑
    turn = "right";
  } else if (x - touchX.value < -50 && Math.abs(y - touchY.value) < 50) {
    //左滑
    turn = "left";
  }
  if (y - touchY.value > 50 && Math.abs(x - touchX.value) < 50) {
    //下滑
    turn = "down";
  } else if (y - touchY.value < -50 && Math.abs(x - touchX.value) < 50) {
    //上滑
    turn = "up";
  }
  //根据方向进行操作
  if (turn === "down" || turn === "up") {
    closeChildren();
  }
};

const getPassingRef = (ref) => {
	ref.value = conversationListDomRef.value;
}

const backFun = () => {
  TUIGlobal?.reLaunch({
    url: "/pages/home/index",
  });
}

const haoyouFun = () => {
  TUIGlobal?.reLaunch({
    url: "/TUIKit/components/TUIContact/index",
  });
}
</script>

<style lang="scss" scoped src="./style/index.scss"></style>
<style>
.backBtn-chart{
  position: fixed;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 20px;
  padding: 15px 0;
  background: #ff8c49;
  font-size: 16px;
  font-weight: bold;
  color: #fff;
  text-align: center;
  width: 90%;
  margin: 0 auto;
  border-radius: 50px;
}
.messagebbox{
  padding: 15px 0;
}
.footbtn{
  position: absolute;
  z-index: 9;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.footbtn span{
  display: block;
  width: 30%;
  font-size: 16px;
  color: #333;
  text-align: center;
  line-height: 33px;
  border-radius: 5px;
  border: 1px solid #FC6902;
}
.footbtn .actspan{
  font-size: 16px;
  color: #fff;
  background: #FC6902;
}
</style>
