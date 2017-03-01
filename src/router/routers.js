export default 
[
 { 
        path:'/',
        name: 'index',
        component: (resolve) => {
            require(['../pages/home/Home.vue'], resolve)
        }
    },
     { 
        path:'/home',
        name: 'home',
        component: (resolve) => {
            require(['../pages/home/Home.vue'], resolve)
        }
    },
     { 
        path:'/libary',
        name: 'libary',
        component: (resolve) => {
            require(['../pages/libary/Libary.vue'], resolve)
        }
    },
       { 
        path:'/libary/:guid',
        name: 'folder',
        component: (resolve) => {
            require(['../pages/libary/FolderList.vue'], resolve)
        }
    },
      {
        path:'/upload',
        name: 'upload',
        component: (resolve) => {
            require(['../pages/upload/Upload.vue'], resolve)
        }
    },
       {
        path:'/todo',
        name: 'todo',
        component: (resolve) => {
            require(['../pages/task/Todo.vue'], resolve)
        }
    },
    {   
        path: '/request',
        name: 'request',
        component: (resolve) => {
            require(['../pages/task/MyRequest.vue'], resolve)
        }
    },
      {
        path:'/finished',
        name: 'finished',
        component: (resolve) => {
            require(['../pages/task/MyFinished.vue'], resolve)
        }
    },
    {
        path:'/tasks',
        name: 'tasks',
        component: (resolve) => {
            require(['../pages/task/MyTasks.vue'], resolve)
        }
    } ,
    {
        path:'/project',
        name: 'project',
        component: (resolve) => {
            require(['../pages/content/MyProject.vue'], resolve)
        }
    },
    {
        path:'/borrow',
        name: 'borrow',
        component: (resolve) => {
            require(['../pages/content/MyBorrow.vue'], resolve)
        }
    },
    {
        path:'/checkout',
        name: 'checkout',
        component: (resolve) => {
            require(['../pages/content/MyCheckOut.vue'], resolve)
        }
    },
    {
        path:'/agent',
        name: 'agent',
        component: (resolve) => {
            require(['../pages/content/MyAgent.vue'], resolve)
        }
    },
    {
        path:'/organization',
        name: 'organization',
        component: (resolve) => {
            require(['../pages/archive/ArchiveReorganize.vue'], resolve)
        }
    },
    {
        path:'/utilization',
        name: 'utilization',
        component: (resolve) => {
            require(['../pages/archive/ArchiveUtilize.vue'], resolve)
        }
    },
    {
        path:'/storage',
        name: 'storage',
        component: (resolve) => {
            require(['../pages/archive/ArchiveStorage.vue'], resolve)
        }
    },
       {
        path:'/paper-report',
        name: 'paper-report',
        component: (resolve) => {
            require(['../pages/report/PaperReport.vue'], resolve)
        }
    }, 
     {
        path:'/print-report',
        name: 'print-report',
        component: (resolve) => {
            require(['../pages/report/PrintReport.vue'], resolve)
        }
    },
      {
        path:'/archive-report',
        name: 'archive-report',
        component: (resolve) => {
            require(['../pages/report/ArchiveReport.vue'], resolve)
        }
    },
       {
        path:'/print-delegation',
        name: 'print-delegation',
        component: (resolve) => {
            require(['../pages/print/PrintDelegation.vue'], resolve)
        }
    },
         {
        path:'/my-delegation',
        name: 'my-delegation',
        component: (resolve) => {
            require(['../pages/print/MyDelegation.vue'], resolve)
        }
    },
            {
        path:'/print-property',
        name: 'print-property',
        component: (resolve) => {
            require(['../pages/print/PrintProperty.vue'], resolve)
        }
    },
    {
        path:'/menu',
        name: 'menu',
        component: (resolve) => {
            require(['../pages/setting/MenuManage.vue'], resolve)
        }
    }, 
    {
        path:'/authority',
        name: 'authority',
        component: (resolve) => {
            require(['../pages/setting/AuthorityManage.vue'], resolve)
        }
    },
     {
        path:'/workflow',
        name: 'workflow',
        component: (resolve) => {
            require(['../pages/setting/WorkFlowManage.vue'], resolve)
        }
    },
    {
        path:'/retrieval',
        name: 'retrieval',
        component: (resolve) => {
            require(['../pages/retrieval/Retrieval.vue'], resolve)
        }
    },                         
]
