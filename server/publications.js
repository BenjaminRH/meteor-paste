Pastes.allow({
	insert: function(userId, doc) {
		return doc.code.length < 50000;
	}
});

Pastes.deny({
	update: function() {
		return true;
	},
	remove: function() {
		return true;
	}
});

Meteor.publish('pastes', function(pasteId) {
	return Pastes.find({ _id: pasteId });
});