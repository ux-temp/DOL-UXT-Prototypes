var control_loop = 0;
var mega_menu = {
    "cat-home":{
    },
    "cat-5": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
				"header-1": "Administrative Finance Bureau",
                "header-2": "Communications",
                "header-3": "Division of Employment Workforce Solutions"
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            },
            "container_size-2": "col_4",
            "container_contents-2": {
                "header-1": "Emergency Management",
                "header-2": "Equal Opportunity Development",
                "header-3": "Human Resources",
                "header-4": "Labor Services"
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            },
            "container_size-3": "col_4",
            "container_contents-3": {
                "header-1": "Office of Staff and Organizational Development",
                "header-2": "Planning and Technology",
                "header-3": "Public Work"
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            },
            "container_size-3": "col_4",
            "container_contents-3": {
                "header-1": "Research & Statistics",
                "header-2": "Safety & Health",
                "header-3": "Special Investigations"
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            },
            "container_size-4": "col_4",
            "container_contents-4": {
                "header-1": "Unemployment Appeal Board",
                "header-2": "Unemployment Benefits",
                "header-3": "Unemplyment Insurance",
                "header-4": "Worker Protection"
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    },


    "cat-2": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
                "header-1": "Job Seekers",
                "link-1": {
                    "url": "#",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://www.example.com",
                    "text": "Find a Job"
                }
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    },

    "cat-3": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
                "header-1": "Job Seekers",
                "link-1": {
                    "url": "#",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://www.example.com",
                    "text": "Find a Job"
                }
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    },

    "cat-4": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
                "header-1": "Job Seekers",
                "link-1": {
                    "url": "#",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://www.example.com",
                    "text": "Find a Job"
                }
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    },

    "cat-1": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
                "header-1": "Job Seekers",
                "link-1": {
                    "url": "#",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://www.example.com",
                    "text": "Find a Job"
                }
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    },

    "cat-6": {
        "size": 17,
        "content": {
            "container_size-1": "col_4",
            "container_contents-1": {
                "header-1": "Job Seekers",
                "link-1": {
                    "url": "#",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://www.example.com",
                    "text": "Find a Job"
                }
            },
            "mega-menu-landing": {
                "url": "More Resources",
                "link": "#"
            }
        }
    }


}

/*
var mega_menu = {
    "menu-test": {
        "size": 17, ---- 1- 20
        "drop": "right", -- OPTIONAL Only use if tag should be on the right
        "adjust": { -- Option only needed if offset must be dont
            "over": "200" -- Number of left offset
        },
        "content": { --- Requred container
            "container_size-1": "col_4", --- Name just need to increment for each section, col_1 -> col_5
            "container_contents-1": { -- Increment number to better reflect 


                --- All items int he section below need to be incremented ---

                "header-1": "Job Seekers", -- Text Only header
                "link-1": { -- Regular Link
                    "url": "http://labor.ny.gov/careerservices/findajob/jobfairrecruitmentsindex.shtm",
                    "text": "Career Fairs and Recruitments"
                },
                "link-2": {
                    "url": "http://labor.ny.gov/careerservices/CareerServicesIndex.shtm",
                    "text": "Find a Job"
                },
                "link-3": {
                    "url": "http://labor.ny.gov/workforcenypartners/osview.asp",
                    "text": "One-Stop Career Centers"
                },
                "header-2": "Unemployment",
                "link-4": {
                    "url": "http://labor.ny.gov/unemploymentassistance.shtm",
                    "text": "Unemployment Assistance"
                },
                "link-5": {
                    "url": "http://labor.ny.gov/ui/claimantinfo/UIBenefitsCalculator.shtm",
                    "text": "Benefits Calculator"
                },
                "link-6": {
                    "url": "http://labor.ny.gov/ui/claimantinfo/ExtendedBenefits.shtm",
                    "text": "Extended Benefits"
                },
                "link-7": {
                    "url": "https://ui.labor.state.ny.us/UBC/home.do",
                    "text": "Claim Weekly Benefits"
                },
                "link-8": {
                    "url": "http://labor.ny.gov/agencyinfo/report-fraud.shtm",
                    "text": "Report Fraud"
                },
                "link-9": {
                    "url": "http://labor.ny.gov/formsdocs/ui/claimant-forms-and-publications.shtm",
                    "text": "Forms and Publications"
                },
                "linkheader-1": { -- Link Header
                    "url": "http://labor.ny.gov/vets/vetintropage.shtm",
                    "text": "Veterans' Services"
                }
            },
            "mega-menu-landing": { -- Button that will render in the low right hand section of the mega menu drop down. This normally does to a backing page.
                "url": "More Resources",
                "link": "http://labor.ny.gov/main/individuals.asp"
            }
        }
    }
}
*/