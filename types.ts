using System.Threading.Tasks;
using AIPortfolio.Domain.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AIPortfolio.API.Controllers
{
    public class SkillsController : ApiControllerBase
    {
        private readonly IProjectRepository _projectRepository;

        public SkillsController(IProjectRepository projectRepository)
        {
            _projectRepository = projectRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetSkills()
        {
            var skills = await _projectRepository.GetSkillsAsync();
            return Ok(skills);
        }
    }
}
