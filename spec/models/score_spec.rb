require 'spec_helper'

describe Score do
  let(:user) { FactoryGirl.create(:user) }
  let(:card) { FactoryGirl.create(:card) }
  let(:score) { Score.for(user, card) }

  subject { score }

  describe :"self.for" do
    context "right after creation" do
      its(:score) { should == 0.5 }
      its(:count) { should == 1 }
    end
  end

  describe :known do
    its "should continuously increase" do
      pending "fix algorithm"
    end
  end

  describe :unknown do
    its "should continuously decrease" do
      pending "fix algorithm"
    end
  end
end
