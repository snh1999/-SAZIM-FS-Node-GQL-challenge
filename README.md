# Schema Types

<details>
  <summary><strong>Table of Contents</strong></summary>

-   [Schema Types](#schema-types)
    -   [Query](#query)
    -   [Mutation](#mutation)
    -   [Types](#types)
        -   [LoginToken](#logintoken)
        -   [Product](#product)
        -   [Transaction](#transaction)
        -   [User](#user)

</details>

## Query

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>user</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>login</strong></td>
<td valign="top"><a href="#logintoken">LoginToken</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Any logged in user can view (Updates view count)

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getAllProducts</strong></td>
<td valign="top">[<a href="#product">Product</a>]</td>
<td>

List of products by all users

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getMyProducts</strong></td>
<td valign="top">[<a href="#product">Product</a>]</td>
<td>

All owned products of currently logged in user (created and bought)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getTransactionHistory</strong></td>
<td valign="top">[<a href="#transaction">Transaction</a>]</td>
<td>

All transactions(rent) of product. If the product is sold, it it added as last entry

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>previewProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Query for additional operations, when product information is needed without updating view count

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#id">ID</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>getMyTransactions</strong></td>
<td valign="top">[<a href="#transaction">Transaction</a>]</td>
<td>

All transactions(rent, sell, buy, lending) of currently logged in user

</td>
</tr>
</tbody>
</table>

## Mutation

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>createUser</strong></td>
<td valign="top"><a href="#user">User</a></td>
<td>

user has to login seapartely after registration, Check `UserType` for constaints

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">firstName</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">lastName</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">email</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">phone</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">address</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">password</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Any logged in user can create

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">title</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">category</td>
<td valign="top">[<a href="#">Category</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">description</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">price</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rentPrice</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rentDuration</td>
<td valign="top"><a href="#">RentDuration</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>updateProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Only owner (logged in) can update

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">title</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">category</td>
<td valign="top">[<a href="#">Category</a>]</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">description</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">price</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rentPrice</td>
<td valign="top"><a href="#int">Int</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">rentDuration</td>
<td valign="top"><a href="#">RentDuration</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>deleteProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Only owner (logged in) can delete

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>buyProduct</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

A product can be bought only once(Owner can not buy). Rents are unaffected for this implementation

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rentProduct</strong></td>
<td valign="top"><a href="#transaction">Transaction</a></td>
<td>

`startDate` and `endDate` has to be a non overlapping date with existing Rent entries, Otherwise fails. Owner can not rent product.

</td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">id</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">startDate</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
<tr>
<td colspan="2" align="right" valign="top">endDate</td>
<td valign="top"><a href="#">String</a>!</td>
<td></td>
</tr>
</tbody>
</table>

## Types

### LoginToken

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>token</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>message</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
</tbody>
</table>

### Product

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>title</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>category</strong></td>
<td valign="top">[<a href="#">Category</a>]</td>
<td>

Category of the product, the value has to be the one of ELECTRONICS,FURNITURE,HOME_APPLIANCES,SPORTING_GOODS,OUTDOOR,TOYS

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>createdAt</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Default exists (not updated later)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>description</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>price</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rentPrice</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rentDuration</strong></td>
<td valign="top"><a href="#">RentDuration</a></td>
<td>

The allowed values are DAY,WEEK,BIWEEK,MONTH,QUARTER,HALFYEAR,YEAR

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>view</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td>

Automatically set, updated. The value updates on query at `getProduct` endpoint. To not update view, use `previewProduct` query.

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>ownerId</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td>

Set automatically(current logged in user). Buying the product updates this field

</td>
</tr>
</tbody>
</table>

### Transaction

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#int">Int</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactionType</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Two accepted values, RENT and SELL. Value is set automatically

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>productID</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>originalOwnerId</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Field for owner at product creation

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>newHolderId</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Field for new buyer/one taking the rent

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rentStartDate</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Only available at RENT, for sell null value

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>rentEndDate</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Only available at RENT, for sell null value

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>transactionDate</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Default exists (not updated later)

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>product</strong></td>
<td valign="top"><a href="#product">Product</a></td>
<td>

Product associated with current Transaction

</td>
</tr>
</tbody>
</table>

### User

Type is set for creating user only, this field might change in case of updating of user inclusion

<table>
<thead>
<tr>
<th align="left">Field</th>
<th align="right">Argument</th>
<th align="left">Type</th>
<th align="left">Description</th>
</tr>
</thead>
<tbody>
<tr>
<td colspan="2" valign="top"><strong>id</strong></td>
<td valign="top"><a href="#id">ID</a></td>
<td></td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>firstName</strong></td>
<td valign="top"><a href="#">String</a>!</td>
<td>

Should only contain letters

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>lastName</strong></td>
<td valign="top"><a href="#">String</a></td>
<td>

Should only contain letters

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>email</strong></td>
<td valign="top"><a href="#">String</a>!</td>
<td>

Must be unique and a valid string

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>phone</strong></td>
<td valign="top"><a href="#">String</a>!</td>
<td>

Must be a valid phone Number

</td>
</tr>
<tr>
<td colspan="2" valign="top"><strong>address</strong></td>
<td valign="top"><a href="#">String</a></td>
<td></td>
</tr>
</tbody>
</table>
