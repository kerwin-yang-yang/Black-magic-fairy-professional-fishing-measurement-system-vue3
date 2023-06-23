<script setup >
import RelationGraph from 'relation-graph/vue3';
const relationGraph$ = ref(null);
const options = {
    allowSwitchLineShape: true,
    allowSwitchJunctionPoint: true,
    defaultJunctionPoint: 'border',
    allowSwitchLineShape: false,
    allowSwitchJunctionPoint: false,
    allowShowDownloadButton: false,
    allowShowMiniToolBar: false,
    moveToCenterWhenRefresh: true,

    'layouts': [
        {
            'label': '中心',
            'layoutName': 'tree',
            'layoutClassName': 'seeks-layout-center',
            'defaultJunctionPoint': 'border',
            'defaultNodeShape': 0,
            'defaultLineShape': 1,
            'from': 'left',
            // 通过这4个属性来调整 tree-层级距离&节点距离
            'min_per_width': '200',
            'max_per_width': '500',
            'min_per_height': '40',
            'max_per_height': '60',
            'levelDistance': '' // 如果此选项有值，则优先级高于上面那4个选项
        }
    ],
    'defaultLineMarker': {
        'markerWidth': 12,
        'markerHeight': 12,
        'refX': 6,
        'refY': 6,
        'data': 'M2,2 L10,6 L2,10 L6,6 L2,2'
    },
    moveToCenterWhenRefresh: true,
    useAnimationWhenRefresh: true,
    zoomToFitWhenRefresh: true,
    'defaultExpandHolderPosition': 'right',
    'defaultNodeShape': 1,
    'defaultNodeWidth': '100',
    'defaultLineShape': 4,
    'defaultJunctionPoint': 'lr',
    'defaultNodeBorderWidth': 0,
    'defaultLineColor': 'rgba(0, 186, 189, 1)',
    'defaultNodeColor': 'rgba(0, 206, 209, 1)'



}
</script>
<template>
    
</template>