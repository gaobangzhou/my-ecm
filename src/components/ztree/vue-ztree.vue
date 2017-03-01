<style>

.ztree * {padding:0; margin:0; font-size:14px; font-family: Open sans, Verdana, Arial, Helvetica, AppleGothic, sans-serif}
.ztree {margin:0; padding:5px; color:#333}
.ztree li{padding:0; margin:0; list-style:none; line-height:21px; text-align:left; white-space:nowrap; outline:0}
.ztree li ul{ margin:0; padding:0 0 0 18px}
.ztree li ul.line{ background:url(./line_conn.png) 0 0 repeat-y;}

.ztree li a {padding-right:3px; margin:0; cursor:pointer; height:21px; color:#333; background-color: transparent; text-decoration:none; display: inline-block}
.ztree li a:hover {text-decoration:underline}
.ztree li a.curSelectedNode {padding-top:0px; background-color:#e5e5e5; color:black; height:21px; opacity:0.8;}

.ztree li a:hover {padding-top:0px; background-color:#e5e5e5; color:black;}

.ztree li span {line-height:21px; margin-right:2px}
.ztree li span.button {line-height:0; margin:0; width:21px; height:21px; display: inline-block; vertical-align:middle;
    border:0 none; cursor: pointer;outline:none;
    background-color:transparent; background-repeat:no-repeat; background-attachment: scroll;
    background-image:url("./metro.png"); *background-image:url("./metro.gif")}


.ztree li span.button.switch {width:21px; height:21px}
.ztree li span.button.root_open{background-position:-105px -64px}
.ztree li span.button.root_close{background-position:-126px -84px}
.ztree li span.button.roots_open{background-position: -105px 0;}
.ztree li span.button.roots_close{background-position: -126px 0;}
.ztree li span.button.center_open{background-position: -105px -21px;}
.ztree li span.button.center_close{background-position: -126px -21px;}
.ztree li span.button.bottom_open{background-position: -105px -42px;}
.ztree li span.button.bottom_close{background-position: -126px -42px;}
.ztree li span.button.noline_open{background-position: -126px -84px;}
.ztree li span.button.noline_close{background-position: -105px -84px;}
.ztree li span.button.root_docu{ background:none;}
.ztree li span.button.roots_docu{background-position: -84px 0;}
.ztree li span.button.center_docu{background-position: -84px -21px;}
.ztree li span.button.bottom_docu{background-position: -84px -42px;}
.ztree li span.button.noline_docu{ background:none;}

.ztree li span.button.ico_open{margin-right:2px; background-position: -147px -21px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.ico_close{margin-right:2px; margin-right:2px; background-position: -147px 0; vertical-align:top; *vertical-align:middle}
.ztree li span.button.ico_docu{margin-right:2px; background-position: -147px -42px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.edit {margin-left:2px; margin-right: -1px; background-position: -189px -21px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.edit:hover {
  background-position: -168px -21px;
}
.ztree li span.button.remove {margin-left:2px; margin-right: -1px; background-position: -189px -42px; vertical-align:top; *vertical-align:middle}
.ztree li span.button.remove:hover {
  background-position: -168px -42px;
}
.ztree li span.button.add {margin-left:2px; margin-right: -1px; background-position: -189px 0; vertical-align:top; *vertical-align:middle}
.ztree li span.button.add:hover {
  background-position: -168px 0;
}
.ztree li span.button.ico_loading{margin-right:2px; background:url(./loading.gif) no-repeat scroll 0 0 transparent; vertical-align:top; *vertical-align:middle}

</style>
<template>
	<div class="ztree_content_wrap">
		<div class="zTreeDemoBackground left" v-if='nodeData'>
			<ul class="ztree">
				<ztree-item v-for='(node,index) in nodeData' :sub-node="node"
					 @node-click="nodeClick" @add-nodes="AddNodes" :index='index' root='0' :total='nodeData.length' :url="url" >				 	
				</ztree-item>
			</ul>
		</div>
	</div>
</template>

<script>
import ZtreeItem from './ZtreeItem'
export default{
	props:{
		// 树数据
        data:{
       	  	type:Array,
       	  	default:[]
        },
		async:{
			type:Boolean,
			default:false
		},
		url:{
			type:String,
			default:''
		}
	},
	data(){
		return{
			nodeData :this.data
		}
	},
	 watch: {
		 data(val){
		 	this.nodeData =val
		 },
	      nodesData(val){
	          this.$emit("add-data",val);
	      }
    },
	methods:{
        nodeClick:function(m){
           this.$emit('node-click', m);
        },
        AddNodes(m){
        	this.nodesData= m
        }
	},
	components:{
		ZtreeItem
	}
}
</script>