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
  <div class="footbtn" v-if="!isShowSelectFriend">
    <span @click="backFun">首页</span>
    <span class="actspan">好友</span>
    <span @click="chatFun">聊天</span>
  </div>
  <SelectFriend v-if="isShowSelectFriend" />
  <div v-else-if="isShowContactList" :class="['TUI-contact', !isPC && 'TUI-contact-h5']">
    <div :class="['TUI-contact-left', !isPC && 'TUI-contact-h5-left']" v-if="isShowContactListInH5">
      <ContactSearch />
      <ContactList :class="['TUI-contact-left-list', !isPC && 'TUI-contact-h5-left-list']" />
    </div>
    <div
      :class="['TUI-contact-right', !isPC && 'TUI-contact-h5-right']"
      v-if="isShowContactInfoInH5"
    >
      <ContactInfo @switchConversation="switchConversation" />
    </div>
  </div>
  </div>
</template>
<script lang="ts" setup>
import { TUIStore, StoreName } from "@tencentcloud/chat-uikit-engine";
import { ref, watchEffect } from "../../adapter-vue";
import { isPC, isUniFrameWork } from "../../utils/env";
import { TUIGlobal } from "../../utils/universal-api/index";

import SelectFriend from "./select-friend/index.vue";
import ContactSearch from "./contact-search/index.vue";
import ContactList from "./contact-list/index.vue";
import ContactInfo from "./contact-info/index.vue";

const backFun = () => {
  TUIGlobal?.reLaunch({
    url: "/pages/home/index",
  });
}
const chatFun = () => {
  TUIGlobal?.reLaunch({
    url: "/TUIKit/components/TUIConversation/index",
  });
}

const emits = defineEmits(["switchConversation"]);

const props = defineProps({
  // web/h5 单页面应用展示形式，uniapp 请忽略
  displayType: {
    type: String,
    default: "contactList", // "contactList" 关系链列表(默认) / "selectFriend" 好友选择列表
    require: false,
  },
});

const displayTypeRef = ref<string>(props.displayType || "contactList");
const isShowSelectFriend = ref(false);
const isShowContactList = ref(true);
const isShowContactListInH5 = ref(true);
const isShowContactInfoInH5 = ref(true);

watchEffect(() => {
  isShowContactList.value = props?.displayType !== "selectFriend";
});

TUIStore.watch(StoreName.CUSTOM, {
  isShowSelectFriendComponent: (data: any) => {

    console.log('isUniFrameWork:'+isUniFrameWork)
    console.log('displayType:'+props?.displayType)
    console.log('data：'+data)

    if (!isUniFrameWork && props?.displayType === "selectFriend") {
      // 原生 web & h5 单页面应用，displayType 为 selectFriend 时，才唤起 selectFriend
      isShowSelectFriend.value = data;
      isShowContactList.value = false;
      return;
    }
    if (data) {
      isShowSelectFriend.value = true;
      if (isUniFrameWork) {
        displayTypeRef.value = "selectFriend";
        TUIGlobal?.hideTabBar();
      }
    } else {
      isShowSelectFriend.value = false;
      if (isUniFrameWork) {
        displayTypeRef.value = props.displayType;
        TUIGlobal?.showTabBar();
      }
    }
  },
  currentContactInfo: (data: any) => {
    if (isPC) {
      isShowContactListInH5.value = true;
      isShowContactInfoInH5.value = true;
    } else if (!data || typeof data !== "object" || Object.keys(data)?.length <= 0) {
      // 判断 移动端 展示 contactList 还是 contactInfo
      // contactInfo 不存在，展示contactList
      isShowContactListInH5.value = true;
      isShowContactInfoInH5.value = false;
    } else {
      // 判断 移动端 展示 contactList 还是 contactInfo
      // contactInfo 存在，展示contactInfo
      isShowContactListInH5.value = false;
      isShowContactInfoInH5.value = true;
    }
  },
});

const switchConversation = (data: any) => {
  isUniFrameWork &&
    TUIGlobal?.navigateTo({
      url: "/TUIKit/components/TUIChat/index",
    });
  emits("switchConversation", data);
};
</script>
<style lang="scss" scoped>
@import url("../../assets/styles/common.scss");
.TUI-contact {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  overflow: hidden;
  &-left {
    min-width: 285px;
    flex: 0 0 24%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  &-right {
    border-left: 1px solid #f4f5f9;
    flex: 1;
    overflow: hidden;
  }
}
.TUI-contact-h5 {
  &-left,
  &-right {
    width: 100%;
    height: 100%;
    flex: 1;
  }
  &-left {
    &-list {
      overflow-y: auto;
    }
  }
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
