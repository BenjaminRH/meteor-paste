Meteor.Router.add({
	'/': function() {
		Session.set('paste', false);
		mixpanel.track('Viewed New Pastes Page');
		return 'new';
	},

	'error_404': function() {
		Session.set('paste', false);
		Session.set('forked-paste', false);
		mixpanel.track('Viewed Error Page');
		return 'error_404';
	},

	'/:id/raw': function(id) { 
		Session.set('loading', true);
		Session.set('forked-paste', false);
		Session.set('paste', id);
		this.response = 'text/plain';
		mixpanel.track('Viewed Raw Paste Page');
		return 'view_raw';
	},

	'/:id': function(id) {
		Session.set('forked-paste', false);
		Session.set('loading', true);
		Session.set('paste', id);
		mixpanel.track('Viewed Paste Page');
		return 'view';
	}
});