import Toast from 'components/common/toast/Toast'
const obj = {}
obj.install = function (Vue) {
    //创建组件构造器
    const toastContrustor = Vue.extend(Toast);
    //new 的方式，根据组件构造器，可以创建出来一个组件对象
    const toast = new toastContrustor()
    //将组件对象，手动挂载到某一个元素上
    toast.$mount(document.createElement('div'))
    //toast.$el对应的就是div
    document.body.appendChild(toast.$el)
    Vue.prototype.$toast = toast;
}
export default obj;