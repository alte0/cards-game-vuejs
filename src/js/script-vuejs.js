var app = new Vue ({
  el: '#app',
  data: function () {
    return {
      screenStart: true,
      screenPlay: false,
      points: 0
    }
  },
  computed: {
  },
  methods: {
    gamePlay: function () {
      this.screenStart = false;
      this.screenPlay = true;
    },
    gamePlayAgain: function () {
      this.screenStart = false;
      this.screenPlay = true;
      this.points = 0;
    }
  }
});