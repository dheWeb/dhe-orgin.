import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

// Dynamic import of the Tree and TreeNode components
const Tree = dynamic(() => import("react-organizational-chart").then(mod => mod.Tree), { ssr: false });
const TreeNode = dynamic(() => import("react-organizational-chart").then(mod => mod.TreeNode), { ssr: false });

const TreeComponent: React.FC = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Tree
        lineWidth={"2px"}
        lineColor={"green"}
        lineBorderRadius={"10px"}
        label={
          <div className="text-center p-2">
            <Link href="/messages" passHref>
              <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                Director
                <br />
                Department of Holistic Education
              </button>
            </Link>
          </div>
        }
      >
        <TreeNode
          label={
            <div className="text-center p-2">
              <Link href="/committee" passHref>
              <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                LMC Members
              </button>
              </Link>
            </div>
          }
        />

        {/* Add more TreeNodes as needed */}
        <TreeNode
          label={
            <div className="text-center p-2">
              <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">Cells</button>
            </div>
          }
        >
          <TreeNode
            label={
              <div className="text-center p-2">
                <Link href="/cells/it" passHref>
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    IT Cell
                  </button>
                </Link>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <Link href="/cells/event" passHref>
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      Event Management Cell
                    </button>
                  </Link>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <Link href="/cells/super100" passHref>
                      <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                        Super 100 Cell
                      </button>
                    </Link>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          {/* Add more TreeNodes as needed */}
          <TreeNode
            label={
              <div className="text-center p-2">
                <Link href="/cells/ipr" passHref>
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    IPR Cell
                  </button>
                </Link>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <Link href="/cells/industry" passHref>
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      Industry Coordination Cell
                    </button>
                  </Link>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <Link href="/cells/hei" passHref>
                      <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                        HEI Coordination Cell
                      </button>
                    </Link>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                  <a href="/cells/ecommerce">E Commerce Cell</a>
                </button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/tms">TMS Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/udyam">Udyam Cell</a>
                    </button>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                  <a href="/cells/foreign">Foreign Language Cell</a>
                </button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/olympiad">Olympiad Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/lms">LMS Cell</a>
                    </button>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary"><a href="/cells/csr">CSR Cell</a></button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/rd">R and D Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/art">Art Cell</a>
                    </button>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary"><a href="/cells/atl">ATL Cell</a></button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/publication">Publications and Promotions Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary"><a href="/cells/environment">Environment Cell</a>
                      
                    </button>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>
          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                  <a href="/cells/parenting">Parenting Cell</a>
                </button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/astrology">Astrology Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/premiumschool">Premium School Cell</a>
                    </button>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>


          <TreeNode
            label={
              <div className="text-center p-2">
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                  <a href="/cells/health">Health Wisdom Cell</a>
                </button>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                    <a href="/cells/sports">Sports Cell</a>
                  </button>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/spritual">Spritual Cell</a>
                    </button>
                  </div>
                }
              >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                      <a href="/cells/grievance">Grievance Redressal Cell</a>
                    </button>
                  </div>
                }
              >
            </TreeNode>
            </TreeNode>
            </TreeNode>
            
          </TreeNode>


        
          {/* Add more TreeNodes as needed */}
        </TreeNode>

        <TreeNode
          label={
            <div className="text-center p-2">
              <Link href="/advisory" passHref>
                <button className="bg-primary p-2 rounded-lg hover:bg-white hover:text-primary">
                  Advisory Committee
                </button>
              </Link>
            </div>
          }
        />
      </Tree>
    </Suspense>
  );
};

export default TreeComponent;
