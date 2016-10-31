/*-----------------
	Components 
-----------------*/

// Parent | Subreddit component containing a list of 'post' components. 
var subreddit = Vue.component('subreddit',{
	template: '#subreddit',
	props: ['name'],

	data: function () {
		return { posts: [] }
	},

	created: function(){
	    this.$http.get("https://www.reddit.com/r/"+ this.name +"/top.json?limit=5")
	    .then(function(resp){
	        this.posts=resp.data.data.children;
	    });
	}
});


// Child | Componenet represiting a single post.
var post = Vue.component('post', {
	template: "#post",
	props: ['item']
});




/*-----------------
   Custom filters 
-----------------*/

// Filter for cutting off strings that are too long.
Vue.filter('truncate', function(value) {
	var length = 60;

	if(value.length <= length) {
		return value;
	}
	else {
		return value.substring(0, length) + '...';			
	}
});


// Filter that takes an image url and creates a CSS style.
Vue.filter('setAsBackground', function(value) {
	if(value && value!='self' && value!='nsfw') {
		return 'background-image: url(' + value + ')';	
	}
	else {
		return 'background-image: url(assets/img/placeholder.png)';	
	}
});




/*-----------------
   Initialize app 
-----------------*/

new Vue({
	el: '#vueContainer'
});