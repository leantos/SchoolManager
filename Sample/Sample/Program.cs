using Sample.services;
using Microsoft.OpenApi.Models;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddScoped<StudentService>();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddControllers();

builder.Services.AddSwaggerGen();

var app = builder.Build();

app.MapControllers();

app.MapGet("/api/hello", () => "School Manager");
app.UseSwagger();
app.UseSwaggerUI();

app.Run();
