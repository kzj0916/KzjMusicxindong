import BackTop from 'components/context/backtop/BackTop';
import {POP, SELL, NEW} from "common/const";
export const backTopMixin = {
    components: {
        BackTop,
    },
    data() {
        return {
            isShow: false,
        }
    },
    methods: {
        //返回顶部 显示隐藏
        backTo() {
            this.$refs.scoll.backTop(0, 0, 400);
        },
        listenShowBack(pon,num=1000) {
            this.isShow = -pon.y > num;
        }
    }
}

