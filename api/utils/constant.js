class DatabaseTable{
    static users="Users";
    static category="Category";
    static products="Products";
}

class UserTable{
    static id="id";
    static unique_id="unique_id";
    static companyName="company_name";
    static mobile="mobile";
    static email="email";
    static countryCode="country_code";
    static isActive="is_active";
    static created="created_at";
    static updated="updated_at";
    static deviceToken="device_token";
}

class CategoryTable{
    static id="id";
    static name="name";
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
}


module.exports = {
    user:UserTable,
    products:ProductsTable,
    category:CategoryTable,
    dbTable:DatabaseTable
};
