define([
    'jquery',
    'underscore',
    'backbone',
    'views/subscription-widget',
    'views/manage-feeds-widget',
    'views/show-read-widget'
], function($, _, Backbone, SubscriptionWidget, ManageFeedsWidget, ShowReadWidget) {
    var NavigationView = Backbone.View.extend({
        events: {
            'click .subscribe': 'subscriptionWidgetShow',
            'click .update_feeds': 'updateFeeds',
            'click .manage-feeds': 'manageFeeds',
            'click .refresh': 'refresh'
        },

        initialize: function(options) {
            _.bindAll(this, 'refresh', 'render');
            this.settings = options.settings;
            this.feeds = options.feeds;
            this.entries = options.entries;
            this.showReadWidget = new ShowReadWidget({model: this.settings});
            this.render();
        },

        render: function() {
            this.$el.children().detach();
            this.$el.append(this.showReadWidget.render().$el);
            this.$el.append($('<li><i class="icon-plus"></i>&nbsp;<a class="subscribe" href="">Subscribe to feed...</a></li>'));
            this.$el.append($('<li><i class="icon-pencil"></i>&nbsp;<a class="manage-feeds" href="">Manage feeds...</a></li>'));
            this.$el.append($('<li><i class="icon-tasks"></i>&nbsp;<a class="update_feeds" href="">Update feeds</a></li>'));
            this.$el.append($('<li><i class="icon-refresh"></i>&nbsp;<a class="refresh" href="">Refresh</a></li>'));
            this.$el.append($('<li><i class="icon-home"></i>&nbsp;<a class="show_all" href="/">All entries</a></li>'));
            this.$el.append($('<li><i class="icon-star"></i>&nbsp;<a class="show_starred" href="feeds/starred">Show starred</a></li>'));
            return this;
        },

        subscriptionWidgetShow: function() {
            var view = new SubscriptionWidget({collection: this.feeds});
            view.render();
            view.show();
            return false;
        },

        updateFeeds: function() {
            $.get('/update_feeds');
            return false;
        },

        manageFeeds: function() {
            var view = new ManageFeedsWidget({collection: this.feeds});
            view.render();
            view.show();
            return false;
        },

        refresh: function() {
            // App.router.refreshPage(true);// FIXME:
            return false;
        }
    });

    return NavigationView;
});
