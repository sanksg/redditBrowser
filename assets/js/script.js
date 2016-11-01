/*-----------------
	Components 
-----------------*/

// Parent | Subreddit component containing a list of 'post' components. 
Vue.component( 'subreddit', {
	
	props: ['subname'],
	template: '#subreddit',
	data: function () {
		return { posts: [] }
	},
	computed: {
    	uppername: function () {
    	  	return this.subname.toUpperCase()
    	}
  	},
	created: function(){
	    this.$http.get("https://www.reddit.com/r/"+ this.subname +"/top.json?limit=5")
	    .then(function(resp){
	        this.posts=resp.data.data.children;
	    });
	}
})


// Child | Componenet represiting a single post.
Vue.component('post', {
	template: "#post",
	props: ['item'],
	methods: {
		// Filter that takes an image url and creates a CSS style.
		setAsBackground: function(value) {
			if(value && value!='self') {
				return 'background-image: url(' + value + ')';	
			}
			else {
				return 'background-image: url(assets/img/placeholder.png)';	
			}
		},
		// Removes the &amp; bug that happens in urls returned from Reddit image uploads
		cleanUrl: function(badurl) {
			return badurl.replace(/&amp;/g, '&')
		}
	},
	filters: {
		// Filter for cutting off strings that are too long.
		truncate: function(value) {
			var length = 60;

			if(value.length <= length) {
				return value;
			}
			else {
				return value.substring(0, length) + '...';			
			}
		}
	},
})




/*-----------------
   Custom filters 
-----------------*/




/*-----------------
   Initialize app 
-----------------*/

new Vue({
	el: '#vueContainer'
})