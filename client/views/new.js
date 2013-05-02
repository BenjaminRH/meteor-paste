Template.new.rendered = function() {
	$('#pastebin').tabby().focus();
};

Template.new.events({
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
});

Template.new.helpers({
	forked_paste: function() {
		return Session.get('forked-paste') ? Pastes.findOne({ _id: Session.get('forked-paste') }) : { code: '' };
	}
});