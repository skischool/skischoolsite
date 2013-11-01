using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;
using System.Web;
using Newtonsoft.Json;

namespace SkiSchool.Web.Helpers
{
    public class Invoke
    {
        public static T Get<T>(Uri uri, out HttpStatusCode httpStatusCode)
        {
            T t;

            using (var client = new HttpClient())
            {
                client.BaseAddress = uri;

                Task<HttpResponseMessage> task = client.GetAsync(uri);

                task.Wait();

                var httpResponseMessage = task.Result;

                t = httpResponseMessage.Content.ReadAsAsync<T>().Result;

                httpStatusCode = httpResponseMessage.StatusCode;
            }

            return t;
        }

        public static T Delete<T>(Uri uri, out HttpStatusCode httpStatusCode)
        {
            T t;

            using (var client = new HttpClient())
            {
                client.BaseAddress = uri;

                Task<HttpResponseMessage> task = client.DeleteAsync(uri);

                task.Wait();

                var httpResponseMessage = task.Result;

                t = httpResponseMessage.Content.ReadAsAsync<T>().Result;

                httpStatusCode = httpResponseMessage.StatusCode;
            }

            return t;
        }

        public static T Post<T>(Uri uri, dynamic formBody, out HttpStatusCode httpStatusCode)
        {
            T t;

            using (var client = new HttpClient())
            {
                client.BaseAddress = uri;

                var content = new StringContent(JsonConvert.SerializeObject(formBody), Encoding.UTF8, "application/json");

                var httpResponseMessage = client.PostAsync(uri, content).Result;

                t = httpResponseMessage.Content.ReadAsAsync<T>().Result;

                httpStatusCode = httpResponseMessage.StatusCode;
            }

            return t;
        }

        public static T Put<T>(Uri uri, dynamic formBody, out HttpStatusCode httpStatusCode)
        {
            T t;

            using (var client = new HttpClient())
            {
                client.BaseAddress = uri;

                var content = new StringContent(JsonConvert.SerializeObject(formBody), Encoding.UTF8, "application/json");

                var httpResponseMessage = client.PutAsync(uri, content).Result;

                t = httpResponseMessage.Content.ReadAsAsync<T>().Result;

                httpStatusCode = httpResponseMessage.StatusCode;
            }

            return t;
        }
    }
}