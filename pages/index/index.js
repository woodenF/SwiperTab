const App = getApp()


Page({
  data: {
    requesting: false,
    end: false,
    emptyShow: false,
    page: 0,
    listData: [],
    enableBackToTop: false,
    refreshSize: 90,
    topSize: 0,
    bottomSize: 0,
    color: '#3f82fd',
  },
  onLoad() {
    const arr = Array.from({ length: 100}, (item, index) => index)
    setTimeout(() => {
      this.setData({
        listData: arr
      })
    }, 1500);
  },
  itemClick(e) {
    console.log(e)
  },
  getList(type) {
    this.setData({
      requesting: true,
    })
    wx.showNavigationBarLoading();

    setTimeout(() => {
      this.setData({
        requesting: false,
      })
      wx.hideNavigationBarLoading();
      if(type === 'more') {
        this.setData({
          end: true
        })
      }
    }, 1500)
  },
  refresh() {
    this.getList()
    console.log('refresh')
  },
  more(){
    this.getList('more')
    console.log('more')
  }
})