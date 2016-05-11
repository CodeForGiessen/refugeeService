(function () {
    var mongoose = require('mongoose');
    var crypto = require('crypto');
    var roles = require('../config').userRoles;
    var Schema = mongoose.Schema;

    var userSchema = new Schema({
        username: String,
        email: String,
        name: String,
        surname: String,
        role: String,
        hashedPassword: String,
        salt: String
    });

    /**
     * virtuals
     */
    userSchema.virtual('password')
        .set(function (password) {
            this._password = password;
            this.salt = this.makeSalt();
            this.hashedPassword = this.encryptPassword(password);
        })
        .get(function () {
            return this._password;
        });

    userSchema.virtual('profile')
        .get(function () {
            return {
                '_id': this._id,
                'username': this.username,
                'email': this.email,
                'name' : this.name+' '+this.surname,
                'role': roles.indexOf(this.role)
            };
        });

    userSchema.virtual('token')
        .get(function () {
            return {
                '_id': this._id,
                'username': this.username,
                'role': this.role
            };
        });

    /**
     * validations
     */
    userSchema.path('email')
        .validate(function (email) {
            return email.length;
        },'blank email is not allowed');

    userSchema.path('email')
        .validate(function (email, respond) {
            var that = this;
            this.constructor.findOne({email: email}, function (err, user) {
                if(err) throw err;
                if(user) {
                    if(that.id === user.id) return respond(true);
                    return respond(false);
                }
                return respond(true);
            });
        }, 'email already used');

    userSchema.path('username')
        .validate(function (username, respond) {
            var that = this;
            this.constructor.findOne({username: username}, function (err, user) {
                if(err) throw err;
                if(user) {
                    if(that.id === user.id) return respond(true);
                    return respond(false);
                }
                return respond(true);
            });
        }, 'username already used');

    userSchema.path('hashedPassword')
        .validate(function (hashedPassword) {
            return hashedPassword.length;
        }, 'blank password is not allowed');

    var validatePresenceOf = function (value) {
        return value && value.length;
    };

    /**
     * pre hooks
     */
    userSchema.pre('save', function (next) {
        if(!this.isNew) return next();
        if(!validatePresenceOf(this.hashedPassword)) {
            next(new Error('Invalid Password'));
        } else {
            next();
        }
    });

    /**
     * Methods
     *
     * @type {{authenticate: mongoose.Schema.methods.authenticate, makeSalt: mongoose.Schema.methods.makeSalt, encryptPassword: mongoose.Schema.methods.encryptPassword}}
     */

    userSchema.methods = {
        /**
         * Authenticate
         *
         * @param plainPassword
         * @returns {boolean}
         */
        authenticate: function (plainPassword) {
            return this.encryptPassword(plainPassword) === this.hashedPassword;
        },

        /**
         * make salt
         * @returns {String}
         */
        makeSalt: function () {
            return crypto.randomBytes(16).toString('base64');
        },

        /**
         * encrypt password
         * @param password
         * @returns {*}
         */
        encryptPassword: function (password) {
            if(!password || !this.salt)
                return '';
            var salt = new Buffer(this.salt, 'base64');
            return crypto.pbkdf2Sync(password, salt, 10000, 64).toString('base64');
        }
    };

    var user = mongoose.model('User', userSchema);

    module.exports.userSchema = userSchema;
    module.exports.user = user;
})();
