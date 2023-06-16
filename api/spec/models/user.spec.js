const mongoose = require("mongoose");
const bcrypt = require('bcrypt')

require("../mongodb_helper");
const User = require("../../models/user");

describe("User model", () => {
  beforeEach((done) => {
    mongoose.connection.collections.users.drop(() => {
      done();
    });
  });

  it("has an email address", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
      name: "User Name"
    });
    expect(user.email).toEqual("someone@example.com");
  });

  it("has a password", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
      name: "User Name"
    });
    expect(user.password).toEqual("password");
  });

  it("has a username", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
      name: "User Name"
    });
    expect(user.username).toEqual("username1");
  });

  it("has a name", () => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
      name: "User Name"
    });
    expect(user.name).toEqual("User Name");
  });

  it("can list all users", (done) => {
    User.find((err, users) => {
      expect(err).toBeNull();
      expect(users).toEqual([]);
      done();
    });
  });

  it("can save a user", (done) => {
    const user = new User({
      email: "someone@example.com",
      password: "password",
      username: "username1", 
      name: "User Name"
    });

    user.save((err) => {
      expect(err).toBeNull();

      User.find((err, users) => {
        expect(err).toBeNull();

        const dbUser = users[0]
        expect(dbUser).toMatchObject({
          email: "someone@example.com",
          username: "username1", 
          name: "User Name"
        });

        bcrypt.compare("password", dbUser.password).then((auth) => {
          expect(auth).toEqual(true);
          done();
        })
      });
    });
  });
});
