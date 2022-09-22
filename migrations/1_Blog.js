const BlogFactory = artifacts.require('BlogFactory')

module.exports = function (deployer) {
  deployer.deploy(BlogFactory)
}
