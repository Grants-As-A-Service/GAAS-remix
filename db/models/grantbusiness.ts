import { model, Schema} from "mongoose";

const GrantBusiness = new Schema({
    grantId: {
        type: Schema.Types.ObjectId,
        required: true
    },
    businessId: {
        type: Schema.Types.ObjectId,
        required: true
    }
});

export const GrantBusinessModel = model("grantbusiness", GrantBusiness);