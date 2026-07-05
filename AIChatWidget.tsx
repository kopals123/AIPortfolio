using System.Threading.Tasks;
using AIPortfolio.API.Controllers;
using AIPortfolio.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace AIPortfolio.Tests
{
    public class ControllersTests
    {
        [Fact]
        public async Task AboutController_ReturnsOkWithProfile()
        {
            // Arrange
            var repository = new FakeProjectRepository();
            var controller = new AboutController(repository);

            // Act
            var result = await controller.GetAbout();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }

        [Fact]
        public async Task ProjectsController_ReturnsOkWithProjects()
        {
            // Arrange
            var repository = new FakeProjectRepository();
            var controller = new ProjectsController(repository);

            // Act
            var result = await controller.GetProjects();

            // Assert
            var okResult = Assert.IsType<OkObjectResult>(result);
            Assert.NotNull(okResult.Value);
        }
    }
}
