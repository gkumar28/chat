import { Document, Schema } from "mongoose";

interface userInterface {
    FirstName: string,
    LastName: string,
    username: string, 
    email: string,
    password: string,
    friends?: [string]
}

interface userDocument extends userInterface,Document { }

const userScheme = new Schema<userDocument>({
    FirstName : {type: String, required: true},
    LastName : {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String,required: true, unique: true},
    password: {type: String,required: true},
    friends: {type: [String]}
});

userScheme.virtual('fullName')
.get(function(this: userDocument): string {
    return this.FirstName+' '+this.LastName;
})
.set(function(this: userDocument,val: string): void {
    this.set({ 
        FirstName: val.substr(0,val.indexOf(' ')),
        LastName: val.substr(val.indexOf(' ') + 1)
    });
});

export {userInterface,userDocument, userScheme};