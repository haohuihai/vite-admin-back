<script lang="tsx">
import { computed, defineComponent, unref } from 'vue'
import { useAppStore } from '@/stores/modules/app'
import { useDesign } from '@/hooks/web/useDesign'
import { useRenderLayout } from './components/useRenderLayout'
import { Setting } from '@/components/Setting'
const { getPrefixCls } = useDesign()
const prefixCls = getPrefixCls('layout')

const appStore = useAppStore()
const mobile = computed(() => appStore.getMobile)
const collapse = computed(() => appStore.getCollapse)
const layout = computed(() => appStore.getLayout)
const handleClickOutside = () => {
  appStore.setCollapse(true)
}
const renderLayout = () => {
  switch (unref(layout)) {
    case 'classic':
      const { renderClassic } = useRenderLayout()
      return renderClassic()
    case 'topLeft':
      const { renderTopLeft } = useRenderLayout()
      return renderTopLeft()
    case 'top':
      const { renderTop } = useRenderLayout()
      return renderTop()
    case 'cutMenu':
      const { renderCutMenu } = useRenderLayout()
      return renderCutMenu()
    default:
      break
  }
}
//  {
//           <Backtop></Backtop>
//         }
export default defineComponent({
  name: 'Layout',
  setup() {
    return () => (
      <section class={[prefixCls, `${prefixCls}__${layout.value}`, 'w-[100%] h-[100%] relative']}>
        {mobile.value && !collapse.value ? (
          <div
            class="absolute top-0 left-0 w-full h-full opacity-30 z-99 bg-[var(--el-color-black)]"
            onClick={handleClickOutside}
          ></div>
        ) : undefined}
        {renderLayout()}
         <Setting></Setting>
      </section>
    )
  }
})
</script>
