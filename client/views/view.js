Template.view.rendered = function() {
	prettyPrint();
};

Template.view.events({
	'click #new': function(e, t) {
		e.preventDefault();
		mixpanel.track('Clicked New Paste');
		Meteor.Router.to('/');
	},
	'click #fork': function(e, t) {
		e.preventDefault();
		Session.set('forked-paste', Session.get('paste'));
		mixpanel.track('Forked Paste');
		Meteor.Router.to('/');
	},
	'click #raw': function(e, t) {
		e.preventDefault();
		mixpanel.track('Clicked View Raw Paste');
		Meteor.Router.to(Session.get('paste') + '/raw');
	}
});

Template.view.helpers({
	paste: function() {
		return Pastes.findOne({ _id: Session.get('paste') });
	},
	loading: function() {
		return Session.get('loading');
	}
});