import React, { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Tree = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.Tree),
  { ssr: false }
);
const TreeNode = dynamic(
  () => import("react-organizational-chart").then((mod) => mod.TreeNode),
  { ssr: false }
);

const nodeLinkClass =
  "bg-primary p-2 rounded-lg hover:bg-white hover:text-primary inline-block text-center min-w-[7rem] text-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-1 rounded-lg";

function TreeNodeLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link href={href} className={nodeLinkClass}>
      {children}
    </Link>
  );
}

const TreeComponent: React.FC = () => {
  return (
    <nav aria-label="DHE organizational structure chart">
      <Suspense fallback={<div>Loading...</div>}>
        <Tree
        lineWidth="2px"
        lineColor="green"
        lineBorderRadius="10px"
        label={
          <div className="text-center p-2">
            <TreeNodeLink href="/messages">
              Director
              <br />
              Department of Holistic Education
            </TreeNodeLink>
          </div>
        }
      >
        <TreeNode
          label={
            <div className="text-center p-2">
              <TreeNodeLink href="/committee">LMC Members</TreeNodeLink>
            </div>
          }
        />

        <TreeNode
          label={
            <div className="text-center p-2">
              <TreeNodeLink href="/structure">Cells</TreeNodeLink>
            </div>
          }
        >
          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/it">IT Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/event">Event Management Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/super100">Super 100 Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/ipr">IPR Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/industry">
                    Industry Coordination Cell
                  </TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/hei">HEI Coordination Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/ecommerce">E-Commerce Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/tms">TMS Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/udyam">Udyam Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/foreign">Foreign Language Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/olympiad">Olympiad Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/lms">LMS Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/csr">CSR Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/rd">R &amp; D Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/art">Art Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/atl">ATL Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/publication">
                    Publications and Promotions Cell
                  </TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/environment">Environment Cell</TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/parenting">Parenting Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/astrology">Astrology Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/premiumschool">
                      Premium School Cell
                    </TreeNodeLink>
                  </div>
                }
              />
            </TreeNode>
          </TreeNode>

          <TreeNode
            label={
              <div className="text-center p-2">
                <TreeNodeLink href="/cells/health">Health Wisdom Cell</TreeNodeLink>
              </div>
            }
          >
            <TreeNode
              label={
                <div className="text-center p-2">
                  <TreeNodeLink href="/cells/sports">Sports Cell</TreeNodeLink>
                </div>
              }
            >
              <TreeNode
                label={
                  <div className="text-center p-2">
                    <TreeNodeLink href="/cells/spritual">Spiritual Cell</TreeNodeLink>
                  </div>
                }
              >
                <TreeNode
                  label={
                    <div className="text-center p-2">
                      <TreeNodeLink href="/cells/grievance">
                        Grievance Redressal Cell
                      </TreeNodeLink>
                    </div>
                  }
                />
              </TreeNode>
            </TreeNode>
          </TreeNode>
        </TreeNode>

        <TreeNode
          label={
            <div className="text-center p-2">
              <TreeNodeLink href="/advisory">Advisory Committee</TreeNodeLink>
            </div>
          }
        />
        </Tree>
      </Suspense>
    </nav>
  );
};

export default TreeComponent;
