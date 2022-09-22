// SPDX-License-Identifier: MIT

pragma solidity ^0.8.16;
import "./Post.sol";

contract BlogFactory {
    Post[] public uploadedPosts;

    function createBlogPost(
        string memory _postTitle,
        string memory _tag,
        string memory _timestamp,
        string memory _content
    ) public {
        Post newPost = new Post(
            _postTitle,
            msg.sender,
            _tag,
            _timestamp,
            _content
        );

        uploadedPosts.push(newPost);
    }

    function getUploadedPosts() public view returns (Post[] memory) {
        return uploadedPosts;
    }
}
