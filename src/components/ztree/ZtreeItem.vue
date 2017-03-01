<template>
	<li :class="levelClass">
		<span class="button switch " :class="[levelClass,rootClass]" @click='open(nodeData)'></span>
		<a class="" @click='Func(nodeData)'>
		  <span class="button" :class="iconClass"></span>
			<span class="node_name">{{nodeData.NAME}}</span>
		</a>
     <ul :class="[levelClass,childrenClass]" v-show='this.nodeData.OPEN==="true"?true:false'>
          <ztree-item v-for="(item,i) in nodeData.CHILDREN" :sub-node="item" :index='i' root='1' @node-click="nodeClick" 
         @add-nodes="AddNodes"  :total='nodeData.CHILDREN.length' :url="url"></ztree-item>
    </ul>
	</li>
</template>
<script>
export default {
	name: 'ztreeItem',
	props: {
		subNode:{
			type:Object,
		},
		index:{
      type:Number,
      default:0
		},
		total:{
      type:Number,
      default:0
		},
		root:{
      type:String,
      default:'0'
		},
    url:{
      type:String,
      default:''
    }
	},
  data(){
    return{
      nodeData:this.subNode
    }
  },
  watch: {
      subNode(val) {
          this.nodeData = val;
      },
      nodeData(val){
          this.$emit("add-nodes",val);
      }
    },
	methods:{
    Func(m){
       this.open(m)
       this.$emit('node-click', m);
    },
    open(m){
      if(typeof(m.CHILDREN)=="undefined"||m.CHILDREN.length==0 &&this.url!=="" && m.OPEN == "false"){    
               m.OPEN="loading"
              this.$http.get(this.url,{ params: { id: m.ID}})
              .then((response) => {         
                    m.CHILDREN= response.data
                    m.OPEN ="true"      
                })
                .catch(function(response) {
                  console.log(response)
                   m.OPEN ="true"
                }) 
        }else{
           if(m.OPEN=="true"){
              m.OPEN = "false"  
            }else{
              m.OPEN ="true"
            }      
        } 
      
    },
    nodeClick(m){
      this.$emit('node-click', m);
    },
    AddNodes(m){
      this.nodeData=m
    }
	},
	computed:{
		// 给（根 和 子树）赋值不同的样式
      rootClass:function(){
      	 var strRootClass = '';
         strRootClass =   (this.index==0 && this.total!=this.index+1) ? 
         "roots_" : (this.total == this.index+1) ? "bottom_" : "center_" 
           
         var openStr ="";
         if(this.nodeData.OPEN==="true"){
          openStr="open"
         }else{
          openStr="close"
         }
      	 return  strRootClass+openStr
      },
      levelClass:function(){
        return "level"+this.index
      },
      iconClass:function(){  
        if(this.nodeData.OPEN==="true"){
           return "ico_open"
        } else if(this.nodeData.OPEN==="false"){
          return "ico_close"
        }else{
          return "ico_loading"
        }        
      },
      childrenClass:function(){
        if(this.nodeData.OPEN==="true"&&this.total!=this.index+1)
       return "line"
      }
	}
}
</script>
<style>
	
</style>