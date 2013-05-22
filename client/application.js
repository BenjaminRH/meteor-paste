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

	// Set up tracking
	mixpanel.init('6cf4b20e5914d0d1bf3ec1e3ebc627f0');
});