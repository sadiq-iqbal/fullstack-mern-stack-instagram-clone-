class UserDto {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.username = user.username;
        this.bio = user.bio;
        this.website = user.website;
    }
}

module.exports = UserDto;