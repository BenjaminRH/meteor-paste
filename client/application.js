Deps.autorun(function() {
	var handle = function() {
		if (Pastes.findOne() == undefined) {
			// Error
			Meteor.Router.to('error_404');
		}

		Session.set('loading', false);
	};

	if (Session.get('paste')) {
		Meteor.subscribe('pastes', Session.get('paste'), handle);
	} else if (Session.get('forked-paste')) {
		Meteor.subscribe('pastes', Session.get('forked_paste'), handle);
	}
});

Meteor.startup(function() {
	Session.setDefault('paste', false);
	Session.setDefault('forked-paste', false);
	Session.setDefault('loading', false);
	Session.setDefault('working', false);
});