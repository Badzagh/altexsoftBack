const knex = require('../knex');

const USER_TABLE = 'users';

//const fileUpload = require("express-fileupload");

var fs = require('fs');

module.exports = {
    async getUSerById(id) {
        const userItem = await knex(USER_TABLE).select('*').where({ id }).first();
    
        return userItem;
    },

    async getUSerByAvatar(avatar) {
        const userItemAvatar = await knex(USER_TABLE).select('*').where({ avatar }).first();
    
        return userItemAvatar;
    },
    
    async getUSERList() {
        const userItem = await knex(USER_TABLE).select('*');
    
        return userItem;
    },
    
    async addUSerItem(userItem) {
        //return knex(USER_TABLE).insert(userItem);

        //let base64_encode = fs.readFileSync();

        let buff = new Buffer(userItem.avatar);
        let base64data = buff.toString('base64');
        return knex(USER_TABLE).insert({
            username: userItem.username || null,
            email: userItem.email || null,
            avatar: base64data || null,
            age: userItem.age || null,
            phone: userItem.phone || null,
        });
    },
    
    async updateUSerItem(id, userItem) {

        let buff = new Buffer(userItem.avatar);
        let base64data = buff.toString('base64');

        return knex(USER_TABLE).update({
            username: userItem.username || null,
            email: userItem.email || null,
            avatar: base64data || null,
            age: userItem.age || null,
            phone: userItem.phone || null,
          })
          .where({ id });
    },
    
    async patchUserItem(id, userItem) {
        //return knex(USER_TABLE).update(userItem).where({ id });

        let buff = new Buffer(userItem.avatar);
        let base64data = buff.toString('base64');
        
        return knex(USER_TABLE).update({
            username: userItem.username || null,
            email: userItem.email || null,
            avatar: base64data || null,
            age: userItem.age || null,
            phone: userItem.phone || null,
        }).where({ id });
    },
    
    async removeUserItem(id) {
        return knex(USER_TABLE).where({ id }).del();
    },
};