Meteor.Router.add({
	'/': function() {
		Session.set('paste', false);
		return 'new';
	},

	'error_404': function() {
		Session.set('paste', false);
		Session.set('forked-paste', false);
		return 'error_404';
	},

	'/:id/raw': function(id) { 
		Session.set('loading', true);
		Session.set('forked-paste', false);
		Session.set('paste', id);
		this.response = 'text/plain';
		return 'view_raw';
	},

	'/:id': function(id) {
		Session.set('forked-paste', false);
		Session.set('loading', true);
		Session.set('paste', id);
		return 'view';
	}
});