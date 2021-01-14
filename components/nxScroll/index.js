 Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    finished: {
      type: Boolean,
      value: false
    },
    loadStatus: {
      type: Boolean,
      value: false,
      observer: 'watchLoadStatus'
    },
    bottomDistance: {
      type: Number,
      value: 0
    },
    topDistance: {
      type: Number,
      value: 0
    }
  },
  data: {
    mode: 'refresh',
    refreshSize: 90,
    refreshMove: -90,
    refreshStatus: 1, // 1 等待下拉 2 松开刷新 3 正在加载 4 加载完成
    timer: null,
    overOnePage: false
  },
  methods: {
    onRefresh(e) {
      const { refreshStatus, timer } = this.data
      const distance = e.detail.y
      if(refreshStatus >= 3) return
      if(distance > -10) {
        this.setData({
          refreshStatus: 2
        })
      } else {
        this.setData({
          refreshStatus: 1
        })
      }
    },
    onRefreshEnd() {
      const { refreshStatus } = this.data

      if(refreshStatus >= 3) return

      if(refreshStatus === 2) {
        this.setData({
          refreshStatus: 3,
          refreshMove: 0,
          mode: 'refresh'
        })
        this.triggerEvent('refresh')
      } else if(refreshStatus === 1) {
        this.setData({
          refreshMove: -90
        })
      }
    },
    onLoadmore() {
      if(!this.properties.finished) {
        this.setData({
          mode: 'more'
        })
        this.triggerEvent('more')
      }
    },
    onScroll() {
      console.log('scroll')
      this.setData({
        overOnePage: true
      })
    },
    watchLoadStatus(status) {
      const { mode,  refreshStatus } = this.data
      console.log('====', status, refreshStatus)
      if(mode === 'more') return
      if(status && refreshStatus !== 3) {
        this.setData({
          refreshStatus: 3,
          move: 0
        })
        return
      }
      if(!status) {
        this.setData({
          refreshStatus: 4
        })
        setTimeout(() => {
          this.setData({
            refreshMove: -90,
          })
          setTimeout(() => {
            this.setData({
              refreshStatus: 1
            })
          }, 300)
        }, 300);
      }
    }
  },
  created: function () {},
});