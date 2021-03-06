'use strict';

(function (This) {
    This.GroupDeleteView = Backbone.View.extend({
        tagName: 'div',
        className: 'modal-wrapper',
        template: templates.groupDeleteViewTpl,
        documentEl: $(document),
        events: {
            'click .btn-delete': 'deleteGroup',
            'click .btn-cancel': 'close'
        },

        initialize: function () {
            _.bindAll(this, 'onKeyPress');
            this.documentEl.bind('keydown', this.onKeyPress);
        },

        render: function () {
            this.$el.append(this.template(this.model.toJSON()));
            
            return this;
        },

        deleteGroup: function () {
            app.mediator.publish('Groups: delete-group');
            app.mediator.publish('Message', {
                 type: 'flash-warning',
                 text: 'Group '+ this.model.get('name') + ' was destroyed.'
             });
            this.model.destroy();
            this.documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        },

        close: function () {
            app.mediator.publish('Groups: dialog-closed');
            this.documentEl.unbind('keydown', this.onKeyPress);
            this.remove();
        },

        onKeyPress: function (e) {
            if (e.keyCode === System.constants.ESC) {
                this.close();
            }

            if (e.keyCode === System.constants.ENTER) {
                this.deleteGroup();
            }
        }
    });
})(CS.Groups);