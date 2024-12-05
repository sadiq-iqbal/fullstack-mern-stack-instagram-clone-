class UserDto {
    constructor(user) {
        this.id = user.id;
        this.email = user.email;
        this.name = user.name;
        this.username = user.username;
        this.bio = user.bio;
        this.website = user.website;
        this.profileImage = user.profileImage;
        this.followers = user.followers;
        this.following = user.following;
    }
}

module.exports = UserDto;