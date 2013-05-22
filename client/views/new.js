Template.new.rendered = function() {
	$('#pastebin').tabby().focus();
};

Template.new.events({
	'click #save': function(e, t) {
		e.preventDefault();
		Session.set('working', true)
		var code = $('#pastebin').val();
		if(code.length < 50000) {
			Pastes.insert({ code: code }, function(error, result) {
				Session.set('working', false);
				
				if(error) {
					mixpanel.track('Error Saving Paste');
					alert('There was a problem saving your paste');
				} else {
					mixpanel.track('Saved Paste');
					Meteor.Router.to('/' + result);
				}
			});
		} else {
			mixpanel.track('Char Limit Reached Saving Paste');
			alert('There cannot be more than 50,000 characters in a paste. You have ' + code.length);
		}
		$('#pastebin').focus();
	}
});

Template.new.helpers({
	forked_paste: function() {
		return Session.get('forked-paste') ? Pastes.findOne({ _id: Session.get('forked-paste') }) : { code: '' };
	},
	working: function() {
		return Session.get('working');
	}
});