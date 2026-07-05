using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AIPortfolio.Domain.Entities;
using AIPortfolio.Domain.Interfaces;

namespace AIPortfolio.Infrastructure.Repositories
{
    /// <summary>
    /// Implements static-configured portfolio repositories (aligned with the data JSON).
    /// </summary>
    public class ProjectRepository : IProjectRepository
    {
        private readonly List<Project> _projects = new List<Project>
        {
            new Project
            {
                Title = "AI Portfolio Website (AIPortfolio)",
                Subtitle = "Self-referential Full-Stack AI System",
                Description = "A high-performance personal portfolio website built with React 19, TypeScript, and TailwindCSS on the frontend, and a highly structured ASP.NET Core Web API backend implementing Clean Architecture, CQRS, and rate limiting. Integrates Hugging Face and Gemini AI for intelligent portfolio assistants.",
                Technologies = new List<string> { "C#", ".NET 8", "React 19", "TypeScript", "TailwindCSS", "Docker", "Hugging Face API", "Gemini API" },
                GithubUrl = "https://github.com/alexmercer-dev/AIPortfolio",
                DemoUrl = "https://aiportfolio-demo.vercel.app",
                Metrics = new List<string> { "98% Lighthouse performance score", "Sub-100ms API response latency", "Robust global exception Handling" }
            },
            new Project
            {
                Title = "Enterprise Message Processing Optimization",
                Subtitle = "High-Throughput Distributed System",
                Description = "An enterprise-grade, event-driven data ingestion pipeline designed to process millions of transactions daily. Implemented using .NET Core microservices, Apache Kafka, and RabbitMQ, configured with optimistic concurrency control, dead-letter queue routing, and automated failover.",
                Technologies = new List<string> { "C#", "Apache Kafka", "RabbitMQ", "SQL Server", "Docker", "Kubernetes", "xUnit" },
                GithubUrl = "https://github.com/alexmercer-dev/EnterpriseMessageProcessing",
                DemoUrl = "https://enterprise-msg-demo.render.com",
                Metrics = new List<string> { "Over 50,000 messages/sec throughput", "Zero message loss SLA achieved", "Automated scaling based on queue lag" }
            },
            new Project
            {
                Title = "Terraform Infrastructure Automation",
                Subtitle = "Infrastructure as Code for Azure Cloud",
                Description = "A production-ready Infrastructure as Code (IaC) repository for deploying secure, PCI-compliant multi-tier cloud environments in Microsoft Azure. Features hub-spoke virtual network topology, private endpoints, managed identities, and automated compliance auditing.",
                Technologies = new List<string> { "Terraform", "Azure Cloud", "Azure DevOps", "GitHub Actions", "Bash" },
                GithubUrl = "https://github.com/alexmercer-dev/AzureIaC-Terraform",
                DemoUrl = "https://github.com/alexmercer-dev/AzureIaC-Terraform",
                Metrics = new List<string> { "Provisioning time reduced from days to 12 minutes", "100% automated CI/CD deployments", "Integrated auto-cost-optimization policies" }
            }
        };

        private readonly List<Skill> _skills = new List<Skill>
        {
            new Skill
            {
                Category = "Backend",
                Items = new List<string> { "C#", ".NET 8 / ASP.NET Core", "Clean Architecture", "EF Core", "Web API", "SOLID Principles", "gRPC", "MediatR" }
            },
            new Skill
            {
                Category = "Frontend",
                Items = new List<string> { "React 19", "TypeScript", "TailwindCSS", "Framer Motion", "React Router", "Redux Toolkit", "HTML5/CSS3" }
            },
            new Skill
            {
                Category = "Cloud & DevOps",
                Items = new List<string> { "Docker", "Kubernetes", "Azure", "AWS", "Terraform", "GitHub Actions", "CI/CD", "Azure DevOps" }
            },
            new Skill
            {
                Category = "Messaging & Databases",
                Items = new List<string> { "RabbitMQ", "Apache Kafka", "PostgreSQL", "SQL Server", "Redis", "MongoDB", "CosmosDB" }
            }
        };

        private readonly AboutProfile _aboutProfile = new AboutProfile
        {
            Name = "Alex Mercer",
            Title = "Lead Software Engineer & Cloud Architect",
            Bio = "Experienced Lead Software Engineer with 8+ years of expertise in designing and building scalable distributed systems, cloud-native enterprise web APIs, and responsive frontends. Specialized in .NET Core/C#, Clean Architecture, microservices, and React ecosystems. Passionate about AI integrations, DevOps automation, and high-performance engineering.",
            Location = "San Francisco, CA (Open to Remote)",
            Email = "alex.mercer@aiportfolio.com",
            Github = "https://github.com/alexmercer-dev",
            Linkedin = "https://linkedin.com/in/alexmercer",
            ResumeUrl = "/resume.pdf",
            Avatar = "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
        };

        public Task<IEnumerable<Project>> GetProjectsAsync()
        {
            return Task.FromResult<IEnumerable<Project>>(_projects);
        }

        public Task<IEnumerable<Skill>> GetSkillsAsync()
        {
            return Task.FromResult<IEnumerable<Skill>>(_skills);
        }

        public Task<AboutProfile> GetAboutProfileAsync()
        {
            return Task.FromResult(_aboutProfile);
        }
    }
}
