Template.view_raw.helpers({
	paste: function() {
		return Pastes.findOne({ _id: Session.get('paste') });
	},
	loading: function() {
		return Session.get('loading');
	}
});