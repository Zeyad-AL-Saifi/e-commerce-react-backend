
class ApiFeatures
{
    constructor (mongooseQuery, queryString)
    {
        this.mongooseQuery = mongooseQuery;
        this.queryString = queryString;
    }



    filter ()
    {
        //you can use this way to make a query
        //.where('price').equals(req.query.price)
        //or this
        // {
        //     price: req.query.price,
        //     rate: req.query.rate,
        //inside the find as object 
        // }
        //or we can put the req.query direct


        // eslint-disable-next-line node/no-unsupported-features/es-syntax
        const queryStringObj = { ...this.queryString };
        const excludesFields = [ 'page', 'sort', 'limit', 'fields' ];
        excludesFields.forEach((field) => delete queryStringObj[ field ]);


        let querySt = JSON.stringify(queryStringObj);
        querySt = querySt.replace(/\b(gte|ge|lte|lt)\b/g, (match) => `$${ match }`);

        this.mongooseQuery = this.mongooseQuery.find(JSON.parse(querySt));
        return this;//عشان تقدر تطبق عليه featuers ثانية

    }

    sort ()
    {
        if (this.queryString.sort)//in query you can add - to sort desending
        {
            const sortBy = this.queryString.sort.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.sort(sortBy);
        } else
        {
            this.mongooseQuery = this.mongooseQuery.sort("-createAt");

        }
        return this;

    }


    limitFields ()
    {
        if (this.queryString.fields)
        {
            const fields = this.queryString.fields.split(',').join(' ');
            this.mongooseQuery = this.mongooseQuery.select(fields);

        } else
        {
            this.mongooseQuery = this.mongooseQuery.select('-__v');
        }
        return this;
    }


    search (modelName)
    {

        if (this.queryString.keyword)
        {
            let query = {};
            if (modelName === 'ProductModel')
            {
                query.$or = [
                    { title: { $regex: this.queryString.keyword, $options: 'i' } },
                    { description: { $regex: this.queryString.keyword, $options: 'i' } },
                ];
            } else
            {
                query = { name: { $regex: this.queryString.keyword, $options: 'i' } };
            }

            this.mongooseQuery = this.mongooseQuery.find(query);

            //$options: "i" to do it no case senstive A,a


        }

        return this;
    }

    paginate (countDocumnets)
    {
        const page = this.queryString.page * 1 || 1;
        const limit = this.queryString.limit * 1 || 50;
        const skip = (page - 1) * limit;
        //pagination result
        const pagination = {};
        pagination.currentPage = page;
        pagination.limit = limit;

        //number of image 
        pagination.numberOfPages = Math.ceil(countDocumnets / limit);

        //next page and prev page
        const endIndex = page * limit;
        if (endIndex < countDocumnets)
        {
            pagination.next = page + 1;
        }
        if (skip > 0)
        {
            pagination.prev = page - 1;
        }

        this.mongooseQuery = this.mongooseQuery.skip(skip).limit(limit);
        this.paginationResult = pagination;

        return this;
    }


}
module.exports = ApiFeatures;