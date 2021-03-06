use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use cosmwasm_std::Addr;
use cw_storage_plus::Item;

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Profile {
    owner: Addr,
    handle: String,
    avatar: String,
    bio: String,
    created: String
}

impl Profile {
    pub fn new(owner:Addr, handle : String, avatar: String, bio: String, created: String) -> Profile {
        Profile {
            owner,
            handle,
            avatar,
            bio,
            created
        }
    }
    pub fn owner(&mut self) -> &mut Addr {
        &mut self.owner
    }
    pub fn owner_immut(&self) -> &Addr {
        &self.owner
    }
    pub fn handle(&mut self) -> &mut String{
        &mut self.handle
    }
    pub fn handle_immut(&self) -> &String {
        &self.handle
    }
    pub fn bio(&mut self) -> &mut String{
        &mut self.bio
    }
    pub fn bio_immut(&self) -> &String {
        &self.bio
    }
    pub fn avatar(&mut self) -> &mut String{
        &mut self.avatar
    }
    pub fn avatar_immut(&self) -> &String {
        &self.avatar
    }
    pub fn created(&mut self) -> &mut String {
        &mut self.created
    }    
    pub fn created_immut(&self) -> &String {
        &self.created
    }

}
#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Thread {
    related_messages_ids: Vec<u32>,
    pub related_messages: Vec<Post>,
    thread_id: u32,
    created: String
}

impl Thread {
    pub fn new(related_messages_ids: Vec<u32>, related_messages: Vec<Post>, thread_id : u32, created: String) -> Thread {
        Thread {
            related_messages_ids,
            related_messages,
            thread_id,
            created
        }
    }
    pub fn related_messages_ids(&mut self) -> &mut Vec<u32> {
        &mut self.related_messages_ids
    }
    pub fn related_messages_ids_immut(&self) -> &Vec<u32> {
        &self.related_messages_ids
    }
    pub fn related_messages(&mut self) -> &mut Vec<Post> {
        &mut self.related_messages
    }
    pub fn related_messages_immut(&self) -> &Vec<Post> {
        &self.related_messages
    }

    pub fn thread_id(&mut self) -> &mut u32 {
        &mut self.thread_id
    }

    pub fn thread_id_immut(&self) -> &u32 {
        &self.thread_id
    }

    pub fn created(&mut self) -> &mut String {
        &mut self.created
    }    

    pub fn created_immut(&self) -> &String {
        &self.created
    }    
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Attachment {
    cid: String,
    filename: String
}

impl Attachment {
    pub fn new(cid: String, filename : String) -> Attachment {
        Attachment {
            cid,
            filename
        }
    }
    pub fn cid(&mut self) -> &mut String {
        &mut self.cid
    }
    pub fn cid_immut(&self) -> &String {
        &self.cid
    }
    pub fn filename(&mut self) -> &mut String {
        &mut self.filename
    }
    pub fn filename_immut(&self) -> &String {
        &self.filename
    }
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct Post {
    owner: Addr,
    subject: String,
    content: String,
    attachment: Vec<Attachment>,
    likes: Vec<Addr>,
    thread_id: u32,
    message_id: u32,
    created: String
}


impl Post {
    pub fn new(owner:Addr, subject : String, content: String, attachment: Vec<Attachment>, thread_id: u32, message_id: u32, created: String) -> Post {
        Post {
            owner,
            subject,
            content,
            likes: Vec::new(),
            attachment,
            thread_id,
            message_id,
            created
        }
    }

    pub fn owner(&mut self) -> &mut Addr {
        &mut self.owner
    }
    pub fn owner_immut(&self) -> &Addr {
        &self.owner
    }

    pub fn content(&mut self) -> &mut String {
        &mut self.content
    }
    
    pub fn content_immut(&self) -> &String {
        &self.content
    }   

    pub fn subject(&mut self) -> &mut String {
        &mut self.subject
    }
    pub fn subject_immut(&self) -> &String {
        &self.subject
    }

    pub fn likes(&mut self) -> &mut Vec<Addr> {
        &mut self.likes
    }
    pub fn likes_immut(&self) -> &Vec<Addr> {
        &self.likes
    }
    pub fn attachment(&mut self) -> &mut Vec<Attachment> {
        &mut self.attachment
    }
    pub fn attachment_immut(&self) -> &Vec<Attachment> {
        &self.attachment
    }

    pub fn created(&mut self) -> &mut String {
        &mut self.created
    }
    pub fn created_immut(&self) -> &String {
        &self.created
    }

    pub fn thread_id(&mut self) -> &mut u32 {
        &mut self.thread_id
    }

    pub fn thread_id_immut(&self) -> &u32 {
        &self.thread_id
    }

    pub fn message_id(&mut self) -> &mut u32 {
        &mut self.message_id
    }
    pub fn message_id_immut(&self) -> &u32 {
        &self.message_id
    }
 
    pub fn like_message(&mut self, addr: Addr){
        let liked = self.likes.iter().position(|x| *x == addr.as_str());

        match liked {
            Some(index) => {
                self.likes.remove(index);
            },
            None => {
                self.likes.push(addr);
            }
        }
    }
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct State {
    pub owner: Addr,
    pub messages: Vec<Post>,
    pub profiles: Vec<Profile>,
    pub threads: Vec<Thread>
}

pub const STATE: Item<State> = Item::new("state");
