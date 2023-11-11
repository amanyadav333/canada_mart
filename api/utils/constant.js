class DatabaseTable{
    static users="Users";
    static category="Category";
    static products="Products";
    static enquiry="Enquiry";
    static bussinessDetail="BussinessDetail";
    static userManagement="UserManagement";
    static typeService="TypeService";
    static taxInformation="TaxInformation";
    static message="Message";
}

class MessageTable{
    static id="id";
    static message="message";
    static createdAt="created_at";
    static sentUserId="sent_user_id";
    static reciverUserId="reciver_user_id";
}

class TaxInformationTable{
    static id="id";
    static userId="user_id";
    static businessNumber="business_number";
    static issuedDate="issued_date";
}

class TypeServiceTable{
    static id="id";
    static userId="user_id";
    static businessType="business_type";
    static paymentType="payment_type";
    static startWeek="start_week";
    static endWeek="end_week";
    static startTime="start_time";
    static endTime="end_time";
    static excludeCity="exclude_city";
    static includeCity="include_city";
    static description="description";
}

class UserManagementTable{
    static id="id";
    static userId="user_id";
    static name="name";
    static mobile="mobile";
    static created="created_at";
    static email="email";
    static role="role";
}

class BussinessDetailTable{
    static id="id";
    static userId="user_id";
    static companyName="company_name";
    static mobile="mobile";
    static created="created_at";
    static address="address";
    static country="country";
    static state="state";
    static city="city";
    static image="image";
    static logo="logo";
}

class EnquiryTable{
    static id="id";
    static name="name";
    static description="description";
    static mobile="mobile";
    static userId="user_id";
}

class UserTable{
    static id="id";
    static unique_id="unique_id";
    static name="name";
    static mobile="mobile";
    static profile="profile";
    static email="email";
    static countryCode="country_code";
    static parentUserID="parent_user_id";
    static isActive="is_active";
    static isCompany="is_company";
    static role="role";
    static created="created_at";
    static updated="updated_at";
    static deviceToken="device_token";
}

class CategoryTable{
    static id="id";
    static name="name";
    static image="image";
    static isProduct="is_product";
    static isParentCategory="is_parent_category";
    static parentCategoryId="parent_category_id";
}
class ProductsTable{
    static id="id";
    static unique_id="unique_id";
    static name="name";
    static description="description";
    static price="price";
    static quantity="quantity";
    static isActive="is_active";
    static isProduct="is_product";
    static created="created_at";
    static parentCategoryId="parent_category_id";
    static childCategoryId="child_category_id";
    static userId="user_id";
    static image="image";
    static deliveryTime="delivery_time";
    static productCode="product_code";
}


module.exports = {
    user:UserTable,
    products:ProductsTable,
    category:CategoryTable,
    enquiry:EnquiryTable,
    bussiness:BussinessDetailTable,
    userManagement:UserManagementTable,
    typeService:TypeServiceTable,
    messageTable:MessageTable,
    taxInformation:TaxInformationTable,
    dbTable:DatabaseTable,
};
