﻿using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using TweetWebApi.Models;

namespace TweetWebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TweetController : Controller
    {
        TweetDBContext db;
        public TweetController(TweetDBContext _db)
        {
            db = _db;
        }
        [HttpGet]
        public IEnumerable<TblTweet> GetProducts()
        {
            return db.TblTweets;
        }
        [HttpPost]
        public string Post([FromBody] TblTweet user)
        {
            TblTweet product = new TblTweet();
            product.Id = user.Id;
            product.AuthorName = user.AuthorName;
            product.AuthorLogo = user.AuthorLogo;
            product.AuthorSlug = user.AuthorSlug;
            product.TweetTime = user.TweetTime;
            product.TweetDescription = user.TweetDescription;
            product.TweetImage = user.TweetImage;

            db.TblTweets.Add(user);
            db.SaveChanges();
            return "success";
        }
    }
}