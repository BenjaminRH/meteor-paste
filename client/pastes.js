Pastes = new Meteor.Collection('pastes');

Session.setDefault('paste', false);
Session.setDefault('forked_paste', false);

Deps.autorun(function() {
	if(Session.get('paste')) {
		Meteor.subscribe('pastes', Session.get('paste'));
	}
	if(Session.get('forked_paste')) {
		Meteor.subscribe('pastes', Session.get('forked_paste'));
	}
});

Meteor.Router.add({
	'/': 'new',

	'/:id/raw': function(id) { 
		Session.set('paste', id);
		this.response = 'text/plain';
		return 'view_raw';
	},

	'/:id': function(id) {
		Session.set('paste', id);
		return 'view';
	}
});

// New
Template.new.rendered = function() {
	$('#pastebin').tabby().focus();
};

Template.new.events = {
	'click #save': function(e, t) {
		e.preventDefault();
		var code = $('#pastebin').val();
		if(code.length < 50000) {
			Pastes.insert({ code: code }, function(error, result) {
				if(error) {
					alert('There was a problem saving your paste');
				} else {
					Meteor.Router.to(result);
				}
			});
		} else {
			alert('There cannot be more than 50,000 characters in a paste. You have ' + code.length);
		}
		$('#pastebin').focus();
	}
};

Template.new.helpers({
	forked_paste: function() {
		return Session.get('forked_paste') ? Pastes.findOne({ _id: Session.get('forked_paste') }) : { code: '' };
	}
});

// View
Template.view.rendered = function() {
	prettyPrint();
};

Template.view.events = {
	'click #new': function(e, t) {
		e.preventDefault();
		Meteor.Router.to('/');
	},
	'click #fork': function(e, t) {
		e.preventDefault();
		Session.set('forked_paste', Session.get('paste'));
		Meteor.Router.to('/');
	},
	'click #raw': function(e, t) {
		e.preventDefault();
		Meteor.Router.to(Session.get('paste') + '/raw');
	}
};

Template.view.helpers({
	paste: function() {
		return Pastes.findOne({ _id: Session.get('paste') });
	}
});

// View Raw
Template.view_raw.helpers({
	paste: function() {
		return Pastes.findOne({ _id: Session.get('paste') });
	}
});